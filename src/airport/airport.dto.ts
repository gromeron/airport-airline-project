/* src/airport/airport.dto.ts */

import { IsNotEmpty, IsString } from 'class-validator';

export class AirportDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly codigo: string;

    @IsString()
    @IsNotEmpty()
    readonly pais: string;

    @IsString()
    @IsNotEmpty()
    readonly ciudad: string;
}
