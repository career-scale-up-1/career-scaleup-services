import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from "cookie-parser"
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(cookieParser())

  // CORS configuration - use environment variable or default to localhost for development
  const allowedOrigins = configService.get<string>('CORS_ORIGIN')?.split(',') || ['http://localhost:3000'];
  app.enableCors({
    origin: allowedOrigins,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
  });

  // Swagger documentation - only enable in non-production environments
  const isProduction = configService.get<string>('NODE_ENV') === 'production';
  if (!isProduction) {
    const config = new DocumentBuilder()
      .setTitle('Career ScaleUp API')
      .setDescription('Career ScaleUp API Description')
      .setVersion('1.0')
      .addBearerAuth(
        {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          name: 'Authorization',
          description: 'Enter JWT token',
          in: 'header',
        },
        'Bearer',
      )
      .addSecurityRequirements('Bearer')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  const port = configService.get<number>('PORT') || 4000;
  await app.listen(port, '0.0.0.0');
  console.log(`Application is running on: http://0.0.0.0:${port}`);
}
bootstrap();
