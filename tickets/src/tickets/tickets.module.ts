import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TicketsController } from './tickets/tickets.controller';
import { ticketSchema } from './models/ticket';
import { TicketRepository } from './repositories/ticket.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Ticket',
        schema: ticketSchema
      }
    ])
  ],
  controllers: [TicketsController],
  providers: [ TicketRepository ]
})
export class TicketsModule {}
