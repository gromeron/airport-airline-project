/* src/airport/airport.entity.ts */

import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';
import { AirlineEntity } from '../airline/airline.entity';

@Entity()
export class AirportEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    codigo: string;
    @Column()
    pais: string;
    @Column()
    ciudad: string;

    @ManyToMany(() => AirlineEntity, airline => airline.airports)
    @JoinTable()
    airlines: AirlineEntity[];
}
