# Deployment Readiness Checklist

## ✅ Fixed Issues

### 1. CORS Configuration
- **Issue**: Hardcoded to `http://localhost:3000`
- **Fix**: Now uses `CORS_ORIGIN` environment variable with support for multiple origins
- **Status**: ✅ Fixed

### 2. Swagger Documentation
- **Issue**: Always enabled, exposing API documentation in production
- **Fix**: Now conditionally enabled based on `NODE_ENV` (disabled in production)
- **Status**: ✅ Fixed

### 3. Email Security
- **Issue**: `secure` setting hardcoded to `false`
- **Fix**: Now uses `MAIL_SECURE` environment variable
- **Status**: ✅ Fixed

### 4. Environment Variables Documentation
- **Issue**: No documentation of required environment variables
- **Fix**: Created `.env.example` with all required variables documented
- **Status**: ✅ Fixed

### 5. Process Management
- **Issue**: No process manager configuration
- **Fix**: Created `ecosystem.config.js` for PM2 with cluster mode and auto-restart
- **Status**: ✅ Fixed

### 6. Deployment Documentation
- **Issue**: No deployment guide
- **Fix**: Created comprehensive `DEPLOYMENT.md` guide
- **Status**: ✅ Fixed

## ⚠️ Pre-Deployment Requirements

Before deploying to VPS, ensure you have:

### Required Environment Variables
All variables listed in `.env.example` must be configured:

1. **Application**
   - `NODE_ENV=production`
   - `PORT=4000` (or your preferred port)
   - `CORS_ORIGIN` - Your frontend domain(s)

2. **Database**
   - `DATABASE_URL` - PostgreSQL connection string

3. **JWT Authentication**
   - `JWT_PRIVATE_KEY` - RSA private key
   - `JWT_PUBLIC_KEY` - RSA public key
   - `JWT_EXPIRES_IN` - Token expiration (e.g., "7d")
   - `JWT_SECRET` - Secret for OTP tokens

4. **Email Service**
   - `MAIL_HOST` - SMTP host
   - `MAIL_PORT` - SMTP port
   - `MAIL_SECURE` - true/false (use true for port 465)
   - `MAIL_USER` - Email username
   - `MAIL_PASS` - Email password/app password
   - `MAIL_FROM` - From email address

5. **External APIs**
   - `RAPID_API_KEY` - RapidAPI key for job search
   - `RAPID_API_HOST` - RapidAPI host
   - `RAPID_API_JSEARCH_URL` - RapidAPI endpoint
   - `BASE_MICROSERVICE_URL` - Microservice base URL
   - `AI_API_BASE_URL` - AI service URL

### Database Setup
- [ ] PostgreSQL installed and running
- [ ] Database created
- [ ] User created with proper permissions
- [ ] Migrations run: `npx prisma migrate deploy`
- [ ] Prisma client generated: `npx prisma generate`

### Security Checklist
- [ ] All secrets are in `.env` file (not committed to git)
- [ ] `.env` is in `.gitignore` ✅ (already configured)
- [ ] Strong database password
- [ ] JWT keys properly generated and secured
- [ ] CORS configured for production domain only
- [ ] Firewall configured (UFW or similar)
- [ ] SSL/HTTPS enabled (Let's Encrypt recommended)

### Server Requirements
- [ ] Node.js 18+ installed
- [ ] PM2 installed globally
- [ ] Nginx installed (for reverse proxy)
- [ ] Sufficient disk space
- [ ] Sufficient RAM (minimum 1GB, 2GB+ recommended)

### Application Build
- [ ] Dependencies installed: `npm install`
- [ ] Application built: `npm run build`
- [ ] Build output in `dist/` directory

## 📋 Deployment Steps Summary

1. **Server Setup**
   - Install Node.js, PostgreSQL, PM2, Nginx
   - Create database and user

2. **Application Setup**
   - Clone repository
   - Copy `.env.example` to `.env` and configure
   - Install dependencies: `npm install`
   - Build application: `npm run build`
   - Run migrations: `npx prisma migrate deploy`

3. **Process Management**
   - Start with PM2: `pm2 start ecosystem.config.js`
   - Save PM2 config: `pm2 save`
   - Setup auto-start: `pm2 startup`

4. **Reverse Proxy** (Optional but recommended)
   - Configure Nginx
   - Setup SSL with Let's Encrypt
   - Configure firewall

5. **Monitoring**
   - Setup log monitoring
   - Configure database backups
   - Setup health checks

## 🔍 Testing Checklist

After deployment, verify:

- [ ] Application starts without errors
- [ ] Database connection works
- [ ] API endpoints respond correctly
- [ ] CORS allows requests from frontend
- [ ] Authentication works (login/register)
- [ ] Email sending works
- [ ] External API integrations work
- [ ] Swagger is disabled in production
- [ ] Logs are being generated
- [ ] PM2 auto-restart works

## 📝 Notes

- The application listens on `0.0.0.0` which is correct for VPS deployment
- Default port is 4000, but can be changed via `PORT` environment variable
- PM2 is configured to use cluster mode for better performance
- Logs are stored in `./logs/` directory
- Database migrations should be run before starting the application

## 🚨 Common Issues

1. **Port already in use**: Change `PORT` in `.env` or stop conflicting service
2. **Database connection failed**: Verify `DATABASE_URL` and PostgreSQL is running
3. **CORS errors**: Check `CORS_ORIGIN` matches your frontend domain exactly
4. **JWT errors**: Ensure RSA keys are properly formatted with `\n` for newlines
5. **Email not sending**: Verify SMTP credentials and `MAIL_SECURE` setting

## 📚 Additional Resources

- See `DEPLOYMENT.md` for detailed step-by-step instructions
- See `.env.example` for all required environment variables
- See `ecosystem.config.js` for PM2 configuration

