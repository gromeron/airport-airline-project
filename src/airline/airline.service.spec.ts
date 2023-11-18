/* src/airline/airline.service.spec.ts */

import { Test, TestingModule } from '@nestjs/testing';
import { AirlineService } from './airline.service';
import { AirlineEntity } from './airline.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AirlineService', () => {
  let service: AirlineService;
  let repo: Repository<AirlineEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AirlineService,
        {
          provide: getRepositoryToken(AirlineEntity),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<AirlineService>(AirlineService);
    repo = module.get<Repository<AirlineEntity>>(getRepositoryToken(AirlineEntity));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
