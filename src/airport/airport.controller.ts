/* src/airport/airport.controller.ts */

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AirportService } from './airport.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AirportDto } from './airport.dto';
import { AirportEntity } from './airport.entity';
import { plainToInstance } from 'class-transformer';

@Controller('airports')
@UseInterceptors(BusinessErrorsInterceptor)
export class AirportController {
    constructor(private readonly airportService: AirportService) {}

    // Obtener todos los aeropuertos
    @Get()
    async findAll() {
        return await this.airportService.findAll();
    }

    // Obtener un aeropuerto por ID
    @Get(':airportId')
    async findOne(@Param('airportId') airportId: number) {
        return await this.airportService.findOne(airportId);
    }

    // Crear un aeropuerto
    @Post()
    async create(@Body() airportDto: AirportDto) {
        const airport: AirportEntity = plainToInstance(AirportEntity, airportDto);
        return await this.airportService.create(airport);
    }

    // Actualizar un aeropuerto
    @Put(':airportId')
    async update(@Param('airportId') airportId: number, @Body() airportDto: AirportDto) {
        const airport: AirportEntity = plainToInstance(AirportEntity, airportDto);
        return await this.airportService.update(airportId, airport);
    }

    // Eliminar un aeropuerto
    @Delete(':airportId')
    @HttpCode(204)
    async delete(@Param('airportId') airportId: number) {
        return await this.airportService.delete(airportId);
    }
}
