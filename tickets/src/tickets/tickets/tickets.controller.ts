import { REQUEST } from '@nestjs/core';
import { Body, Controller, Get, Post, UseGuards, Inject, Param, Put } from '@nestjs/common';

import { TicketDoc } from '../models/ticket';
import { AuthenticationGuard } from '@iltickets/common';
import { TicketRepository } from '../repositories/ticket.repository';
import { CreateTicketDto } from '../models/ticket-dto.model';

@Controller('tickets')
export class TicketsController {

    constructor(private readonly ticketRepo: TicketRepository,
                @Inject(REQUEST) private request) {}

    @Get()
    getAllTickets(): Promise<TicketDoc[]> {
        return this.ticketRepo.findAll();
    }

    @Get(':id')
    getOneTicket(@Param('id') id: string): Promise<TicketDoc> {
        return this.ticketRepo.findTicketById(id);
    }

    @Post()
    @UseGuards(AuthenticationGuard)
    createTicket(@Body() ticket: CreateTicketDto): Promise<TicketDoc> {
        const userId = this.request['currentUser'].id;

        const createTicket = { ...ticket, userId };

        return this.ticketRepo.createTicket(createTicket);
    }

    @Put()
    @UseGuards(AuthenticationGuard)
    updateTicket(@Body() id: string, @Body() ticket: Partial<TicketDoc>): Promise<TicketDoc> {
        return this.ticketRepo.updateTicket(id, ticket);
    }
}
