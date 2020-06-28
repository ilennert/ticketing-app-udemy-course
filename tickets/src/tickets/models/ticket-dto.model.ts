import { IsNotEmpty, Min, IsNumber } from 'class-validator';

export class CreateTicketDto {
    @IsNotEmpty()
    title: string;

    @IsNumber()
    @Min(0)
    price: number;

    userId?: string;
}