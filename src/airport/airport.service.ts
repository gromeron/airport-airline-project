/* src/airport/airport.service.ts */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AirportEntity } from './airport.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AirportService {
    constructor(
        @InjectRepository(AirportEntity)
        private readonly airportRepository: Repository<AirportEntity>,
    ) {}

    // Obtener todos los aeropuertos
    async findAll(): Promise<AirportEntity[]> {
        return await this.airportRepository.find({ relations: ["airlines"] });
    }

    // Obtener un aeropuerto por ID
    async findOne(id: number): Promise<AirportEntity> {
        const airport: AirportEntity = await this.airportRepository.findOne({where: { id }, relations: ["airlines"]});
        if (!airport)
            throw new BusinessLogicException("The airport with the given id was not found", BusinessError.NOT_FOUND);
        return airport;
    }

    // Crear un aeropuerto
    async create(airport: AirportEntity): Promise<AirportEntity> {
        return await this.airportRepository.save(airport);
    }

    // Actualizar un aeropuerto
    async update(id: number, airport: AirportEntity): Promise<AirportEntity> {
        const persistedAirport: AirportEntity = await this.airportRepository.findOne({where: { id }});
        if (!persistedAirport)
            throw new BusinessLogicException("The airport with the given id was not found", BusinessError.NOT_FOUND);
        return await this.airportRepository.save({ ...persistedAirport, ...airport });
    }

    // Eliminar un aeropuerto
    async delete(id: number): Promise<void> {
        const airport: AirportEntity = await this.airportRepository.findOne({where: { id }});
        if (!airport)
            throw new BusinessLogicException("The airport with the given id was not found", BusinessError.NOT_FOUND);
        await this.airportRepository.remove(airport);
    }
}
