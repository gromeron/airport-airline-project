/* src/airport/airport.service.spec.ts */

import { Test, TestingModule } from '@nestjs/testing';
import { AirportService } from './airport.service';
import { AirportEntity } from './airport.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AirportService', () => {
  let service: AirportService;
  let repository: Repository<AirportEntity>;
  let airportsList: AirportEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AirportService],
    }).compile();

    service = module.get<AirportService>(AirportService);
    repository = module.get<Repository<AirportEntity>>(getRepositoryToken(AirportEntity));
    await seedDatabase();
  }, 20000);

  const seedDatabase = async () => {
    repository.clear();
    airportsList = [];
    for (let i = 0; i < 5; i++) {
      const airport: AirportEntity = await repository.save({
        nombre: faker.location.city(),
        codigo: faker.string.alphanumeric(3).toUpperCase(),
        pais: faker.location.country(),
        ciudad: faker.location.city(),
        airlines: []
      });
      airportsList.push(airport);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new airport', async () => {
      const airportData = {
        id: faker.number.int(),
        nombre: faker.address.city(),
        codigo: faker.random.alphaNumeric(3).toUpperCase(),
        pais: faker.address.country(),
        ciudad: faker.address.city(),
        airlines: []
      };
      const result = await service.create(airportData);
      expect(result).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return all airports', async () => {
      const airports: AirportEntity[] = await service.findAll();
      expect(airports).not.toBeNull();
      expect(airports).toHaveLength(airportsList.length);
    });
  });

  describe('findOne', () => {
    it('should return an airport by id', async () => {
      const storedAirport: AirportEntity = airportsList[0];
      const airport: AirportEntity = await service.findOne(storedAirport.id);
      expect(airport).not.toBeNull();
      expect(airport.nombre).toEqual(storedAirport.nombre);
      expect(airport.codigo).toEqual(storedAirport.codigo);
      expect(airport.pais).toEqual(storedAirport.pais);
      expect(airport.ciudad).toEqual(storedAirport.ciudad);
    });

    it('should throw an exception for an invalid airport', async () => {
      await expect(() => service.findOne(0)).rejects.toHaveProperty('message', 'The airport with the given id was not found');
    });
  });
});
