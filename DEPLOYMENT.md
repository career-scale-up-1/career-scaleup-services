# VPS Deployment Guide

This guide will help you deploy the Career ScaleUp Services API to a VPS.

## Prerequisites

- Ubuntu/Debian VPS (or similar Linux distribution)
- Node.js 18+ installed
- PostgreSQL database
- PM2 installed globally (`npm install -g pm2`)
- Nginx (for reverse proxy)
- Domain name with DNS configured (optional but recommended)

## Step 1: Server Setup

### Install Node.js

```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Install PostgreSQL

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

### Create Database

```bash
sudo -u postgres psql
CREATE DATABASE career_scaleup;
CREATE USER your_db_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE career_scaleup TO your_db_user;
\q
```

### Install PM2

```bash
sudo npm install -g pm2
```

## Step 2: Application Deployment

### Clone and Setup

```bash
cd /var/www
sudo git clone <your-repo-url> career-scaleup-services
cd career-scaleup-services
sudo npm install
```

### Environment Configuration

```bash
sudo cp .env.example .env
sudo nano .env
```

Fill in all required environment variables (see `.env.example` for reference).

**Important variables to configure:**
- `NODE_ENV=production`
- `DATABASE_URL` - Your PostgreSQL connection string
- `CORS_ORIGIN` - Your frontend domain(s)
- `JWT_PRIVATE_KEY` and `JWT_PUBLIC_KEY` - RSA key pair
- `MAIL_*` - Email service configuration

### Generate JWT Keys

```bash
# Generate private key
openssl genrsa -out private.pem 2048

# Extract public key
openssl rsa -in private.pem -pubout -out public.pem

# Copy keys to .env file (replace newlines with \n)
cat private.pem | tr '\n' '\\n'
cat public.pem | tr '\n' '\\n'
```

### Build Application

```bash
npm run build
```

### Run Database Migrations

```bash
npx prisma migrate deploy
npx prisma generate
```

## Step 3: Process Management with PM2

### Start Application

```bash
# Create logs directory
mkdir -p logs

# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on system boot
pm2 startup
# Follow the instructions provided by the command
```

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs career-scaleup-api

# Restart application
pm2 restart career-scaleup-api

# Stop application
pm2 stop career-scaleup-api

# Monitor
pm2 monit
```

## Step 4: Nginx Reverse Proxy (Optional but Recommended)

### Install Nginx

```bash
sudo apt install nginx
```

### Configure Nginx

Create a new configuration file:

```bash
sudo nano /etc/nginx/sites-available/career-scaleup-api
```

Add the following configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    # Redirect HTTP to HTTPS (if using SSL)
    # return 301 https://$server_name$request_uri;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }

    # Increase timeouts for long-running requests
    proxy_connect_timeout 60s;
    proxy_send_timeout 60s;
    proxy_read_timeout 60s;
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/career-scaleup-api /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL with Let's Encrypt (Recommended)

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com -d www.your-domain.com
```

## Step 5: Firewall Configuration

```bash
# Allow SSH
sudo ufw allow 22/tcp

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable
```

## Step 6: Monitoring and Maintenance

### Health Check

The application should be accessible at:
- Direct: `http://your-server-ip:4000`
- Through Nginx: `http://your-domain.com`

### Logs

- Application logs: `pm2 logs career-scaleup-api`
- PM2 logs: `./logs/pm2-*.log`
- Nginx logs: `/var/log/nginx/access.log` and `/var/log/nginx/error.log`

### Database Backups

Set up regular PostgreSQL backups:

```bash
# Create backup script
sudo nano /usr/local/bin/backup-db.sh
```

```bash
#!/bin/bash
BACKUP_DIR="/var/backups/postgresql"
DATE=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR
sudo -u postgres pg_dump career_scaleup > $BACKUP_DIR/backup_$DATE.sql
# Keep only last 7 days of backups
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

Make it executable:
```bash
sudo chmod +x /usr/local/bin/backup-db.sh
```

Add to crontab:
```bash
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-db.sh
```

## Troubleshooting

### Application won't start
- Check environment variables: `pm2 logs career-scaleup-api`
- Verify database connection
- Check port availability: `sudo netstat -tulpn | grep 4000`

### Database connection errors
- Verify PostgreSQL is running: `sudo systemctl status postgresql`
- Check database credentials in `.env`
- Verify database exists and user has permissions

### CORS errors
- Verify `CORS_ORIGIN` in `.env` matches your frontend domain
- Check Nginx configuration if using reverse proxy

### High memory usage
- Adjust `max_memory_restart` in `ecosystem.config.js`
- Monitor with `pm2 monit`

## Security Checklist

- [ ] All environment variables are set correctly
- [ ] Database password is strong and secure
- [ ] JWT keys are properly generated and secured
- [ ] CORS is configured to only allow your frontend domain
- [ ] Swagger is disabled in production (handled automatically)
- [ ] Firewall is configured correctly
- [ ] SSL/HTTPS is enabled
- [ ] Regular database backups are configured
- [ ] PM2 is configured to auto-restart on crashes
- [ ] Logs are being monitored

## Updating the Application

```bash
cd /var/www/career-scaleup-services
git pull origin main
npm install
npm run build
npx prisma migrate deploy
npx prisma generate
pm2 restart career-scaleup-api
```

## Additional Resources

- [NestJS Deployment Documentation](https://docs.nestjs.com/deployment)
- [PM2 Documentation](https://pm2.keymetrics.io/docs/usage/quick-start/)
- [Nginx Documentation](https://nginx.org/en/docs/)

