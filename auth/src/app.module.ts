import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { GetUserMiddleware } from './middleware/get-user.middleware';
import { MONGO_CONNECTION } from './constants';

@Module({
  imports: [ AuthModule,
             MongooseModule.forRoot(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
        
    consumer
        .apply(GetUserMiddleware)
        .forRoutes(
          AuthController
        );
  }
}
