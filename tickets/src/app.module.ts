import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GetUserMiddleware } from '@iltickets/common';
import { TicketsModule } from './tickets/tickets.module';
import { TicketsController } from './tickets/tickets/tickets.controller';
import { MONGO_CONNECTION } from './constants';

@Module({
  imports: [ TicketsModule,
             MongooseModule.forRoot(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }),
             TicketsModule ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
        
    consumer
        .apply(GetUserMiddleware)
        .forRoutes(
          TicketsController
        );
  }
}
