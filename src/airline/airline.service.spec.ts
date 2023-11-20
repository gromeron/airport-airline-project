/* src/airline/airline.service.spec.ts */

import { Test, TestingModule } from '@nestjs/testing';
import { AirlineService } from './airline.service';
import { AirlineEntity } from './airline.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { faker } from '@faker-js/faker';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

describe('AirlineService', () => {
  let service: AirlineService;
  let repository: Repository<AirlineEntity>;
  let airlinesList: AirlineEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AirlineService],
    }).compile();

    service = module.get<AirlineService>(AirlineService);
    repository = module.get<Repository<AirlineEntity>>(getRepositoryToken(AirlineEntity));
    await seedDatabase();
  }, 20000);

  const seedDatabase = async () => {
    repository.clear();
    airlinesList = [];
    for(let i = 0; i < 5; i++) {
      const airline: AirlineEntity = await repository.save({
        nombre: faker.person.fullName(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: faker.date.past(),
        paginaWeb: faker.internet.url()
      });
      airlinesList.push(airline);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new airline', async () => {
      const airlineData = {
        id: faker.number.int(),
        nombre: faker.person.fullName(),
        descripcion: faker.lorem.sentence(),
        fechaFundacion: faker.date.past(),
        paginaWeb: faker.internet.url(),
        airports: []
      };
      const result = await service.create(airlineData);
      expect(result).toBeDefined();
    });

  it('findAll should return all airlines', async () => {
    const airlines: AirlineEntity[] = await service.findAll();
    expect(airlines).not.toBeNull();
    expect(airlines).toHaveLength(airlinesList.length);
  });

  it('findOne should return an airline by id', async () => {
    const storedAirline: AirlineEntity = airlinesList[0];
    const airline: AirlineEntity = await service.findOne(storedAirline.id);
    expect(airline).not.toBeNull();
    expect(airline.nombre).toEqual(storedAirline.nombre);
    expect(airline.descripcion).toEqual(storedAirline.descripcion);
    expect(airline.fechaFundacion).toEqual(storedAirline.fechaFundacion);
    expect(airline.paginaWeb).toEqual(storedAirline.paginaWeb);
  });

  it('findOne should throw an execption for an invalid airline', async () => {
    await expect(() => service.findOne(0)).rejects.toHaveProperty('message', 'The airline with the given id was not found');
  });
  });
});
