/* src/airline/airline.service.ts */

import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AirlineEntity } from './airline.entity';
import { BusinessError, BusinessLogicException } from '../shared/errors/business-errors';

@Injectable()
export class AirlineService {
    constructor(
        @InjectRepository(AirlineEntity)
        private readonly airlineRepository: Repository<AirlineEntity>,
    ) {}

    // Obtener todas las aerolineas
    async findAll(): Promise<AirlineEntity[]> {
        return await this.airlineRepository.find({ relations: ["airports"] });
    }

    // Obtener una aerolinea por ID
    async findOne(id: number): Promise<AirlineEntity> {
        const airline: AirlineEntity = await this.airlineRepository.findOne({where: { id }, relations: ["airports"]});
        if (!airline)
            throw new BusinessLogicException("The airline with the given id was not found", BusinessError.NOT_FOUND);
        return airline;
    }

    // Crear una aerolinea
    async create(airline: AirlineEntity): Promise<AirlineEntity> {
        return await this.airlineRepository.save(airline);
    }

    // Actualizar una aerolinea
    async update(id: number, airline: AirlineEntity): Promise<AirlineEntity> {
        const persistedAirline: AirlineEntity = await this.airlineRepository.findOne({where: { id }});
        if (!persistedAirline)
            throw new BusinessLogicException("The airline with the given id was not found", BusinessError.NOT_FOUND);
        return await this.airlineRepository.save({ ...persistedAirline, ...airline });
    }

    // Eliminar una aerolinea
    async delete(id: number): Promise<void> {
        const airline: AirlineEntity = await this.airlineRepository.findOne({where: { id }});
        if (!airline)
            throw new BusinessLogicException("The airline with the given id was not found", BusinessError.NOT_FOUND);
        await this.airlineRepository.remove(airline);
    }
}
