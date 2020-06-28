import { Injectable, ForbiddenException, UnauthorizedException } from "@nestjs/common";


import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

import { TicketDoc } from '../models/ticket';

@Injectable()
export class TicketRepository {

    constructor(@InjectModel('Ticket') private ticketModel: Model<TicketDoc>) {}

    async findAll(): Promise<TicketDoc[]> {
        return this.ticketModel.find();
    }

    async findTicketById(id: string): Promise<TicketDoc> {
        return this.ticketModel.findOne({ _id: id });
    }

    async createTicket(createTicket: { title: string, price: number, userId: string }): Promise<TicketDoc> {
        const ticket = new this.ticketModel(createTicket);
        ticket.save();
        return ticket;
    }

    async updateTicket(id: string, changes: Partial<TicketDoc>): Promise<TicketDoc> {
        return this.ticketModel.findOneAndUpdate(
            { _id: id },
            changes,
            { new: true });
    }
}
