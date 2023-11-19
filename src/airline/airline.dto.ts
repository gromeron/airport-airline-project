/* src/airline/airline.dto.ts */

import { IsNotEmpty, IsString, IsUrl, IsDate } from 'class-validator';

export class AirlineDto {

    @IsString()
    @IsNotEmpty()
    readonly nombre: string;

    @IsString()
    @IsNotEmpty()
    readonly descripcion: string;

    @IsDate()
    @IsNotEmpty()
    readonly fechaFundacion: Date;

    @IsUrl()
    @IsNotEmpty()
    readonly paginaWeb: string;
}
