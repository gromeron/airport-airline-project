/* src/shared/testing-utils/typeorm-testing-config.ts */

import { TypeOrmModule } from '@nestjs/typeorm';
import { AirportEntity } from '../../airport/airport.entity';

export const TypeOrmTestingConfig = () => [
    TypeOrmModule.forRoot({
        type: 'sqlite',
        database: ':memory:',
        entities: [AirportEntity],
        synchronize: true,
        dropSchema: true,
        keepConnectionAlive: true
    }),
    TypeOrmModule.forFeature([AirportEntity]),
];