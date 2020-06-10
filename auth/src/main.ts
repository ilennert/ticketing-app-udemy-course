import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from "@nestjs/common";

import { AppModule } from './app.module';
import { HttpExceptionFilter } from "./filters/http.filter";
import { FallbackExceptionFilter } from "./filters/fallback.filter";
import { ValidationFilter } from "./filters/validation.filter";
import { ValidationException } from "./filters/validation.exception";

async function bootstrap() {
  if (!process.env.JWT_KEY) {
    process.env.JWT_KEY = 'asdfsd';
    console.log('WARNING: JWT_KEY not configured, using default...');
  }
  const app = await NestFactory.create(AppModule, {cors: true});
  app.setGlobalPrefix('api');

  app.setGlobalPrefix('api');
  app.useGlobalFilters(
      new FallbackExceptionFilter(),
      new HttpExceptionFilter(),
      new ValidationFilter());
  
  app.useGlobalPipes(new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {

          const messages = errors.map(
              error => `${error.property} has wrong value ${error.value},
              ${Object.values(error.constraints).join(', ')}`
          );

          return new ValidationException(messages);
      }
  }));

  await app.listen(3000);
  console.log('Auth service - v1.3, listening on port 3000');
}
bootstrap();
