import { NestFactory } from '@nestjs/core';
import { ValidationError, ValidationPipe } from "@nestjs/common";

import { AppModule } from './app.module';
import { HttpExceptionFilter } from "@iltickets/common";
import { FallbackExceptionFilter } from "@iltickets/common";
import { ValidationFilter } from "@iltickets/common";
import { ValidationException } from "@iltickets/common";

async function bootstrap() {
  if (!process.env.JWT_KEY) {
    process.env.JWT_KEY = 'asdfsd';
    console.log('WARNING: JWT_KEY not configured, using default...');
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error('ERROR: NATS_CLIENT_ID must be defined');
  }
  if (!process.env.NATS_URL) {
    throw new Error('ERROR: NATS_URL must be defined');
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error('ERROR: NATS_CLUSTER_ID must be defined');
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
  console.log('Tickets service - v1.1, listening on port 3000');
}
bootstrap();
