/* src/airline/airline.controller.ts */

import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { AirlineService } from './airline.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors/business-errors.interceptor';
import { AirlineDto } from './airline.dto';
import { AirlineEntity } from './airline.entity';
import { plainToInstance } from 'class-transformer';

@Controller('airlines')
@UseInterceptors(BusinessErrorsInterceptor)
export class AirlineController {
    constructor(private readonly airlineService: AirlineService) {}

    // Obtener todas las aerolineas
    @Get()
    async findAll() {
        return await this.airlineService.findAll();
    }

    // Obtener una aerolinea por ID
    @Get(':airlineId')
    async findOne(@Param('airlineId') airlineId: number) {
        return await this.airlineService.findOne(airlineId);
    }

    // Crear una aerolinea
    @Post()
    async create(@Body() airlineDto: AirlineDto) {
        const airline: AirlineEntity = plainToInstance(AirlineEntity, airlineDto);
        return await this.airlineService.create(airline);
    }

    // Actualizar una aerolinea
    @Put(':airlineId')
    async update(@Param('airlineId') airlineId: number, @Body() airlineDto: AirlineDto) {
        const airline: AirlineEntity = plainToInstance(AirlineEntity, airlineDto);
        return await this.airlineService.update(airlineId, airline);
    }

    // Eliminar una aerolinea
    @Delete(':airlineId')
    @HttpCode(204)
    async delete(@Param('airlineId') airlineId: number) {
        return await this.airlineService.delete(airlineId);
    }
}
