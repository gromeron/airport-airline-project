/* src/airline-airport/airline-airport.controller.ts */

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AirlineAirportService } from './airline-airport.service';
import { AirportDto } from 'src/airport/airport.dto';
import { plainToInstance } from 'class-transformer';
import { AirportEntity } from 'src/airport/airport.entity';

@Controller('airline-airport')
@UseInterceptors(BusinessErrorsInterceptor)
export class AirlineAirportController {
    constructor(private readonly airlineAirportService: AirlineAirportService) {}

    // Asociar un aeropuerto a una aerolinea
    @Post(':airlineId/airports/:airportId')
    async addAirportToAirline(@Param('airlineId') airlineId: number, @Param('airportId') airportId: number) {
        return await this.airlineAirportService.addAirportToAirline(airlineId, airportId);
    }

    // Obtener un aeropuerto por ID de una aerolinea
    @Get(':airlineId/airports/:airportId')
    async findAirportsByAirlineIdAirportId(@Param('airlineId') airlineId: number, @Param('airportId') airportId: number) {
        return await this.airlineAirportService.findAirportsByAirlineIdAirportId(airlineId, airportId);
    }

    // Obtener todos los aeropuertos de una aerolinea
    @Get(':airlineId/airports')
    async findAirportByAirlineId(@Param('airlineId') airlineId: number) {
        return await this.airlineAirportService.findAirportByAirlineId(airlineId);
    }

    // Asociar varios aeropuertos a una aerolinea
    @Put(':airlineId/airports')
    async associateAirportsToAirline(@Body() AirportDto: AirportDto[], @Param('airlineId') airlineId: number) {
        const airports = plainToInstance(AirportEntity, AirportDto);
        return await this.airlineAirportService.associateAirportsToAirline(airlineId, airports);
    }

    // Desasociar un aeropuerto de una aerolinea
    @Delete(':airlineId/airports/:airportId')
    @HttpCode(204)
    async deleteAirportFromAirline(@Param('airlineId') airlineId: number, @Param('airportId') airportId: number) {
        return await this.airlineAirportService.deleteAirportAirline(airlineId, airportId);
    }
}
