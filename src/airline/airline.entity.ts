/* src/airline/airline.entity.ts */

import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';
import { AirportEntity } from '../airport/airport.entity';

@Entity()
export class AirlineEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    nombre: string;
    @Column()
    descripcion: string;
    @Column()
    fechaFundacion: Date;
    @Column()
    paginaWeb: string;
    
    @ManyToMany(() => AirportEntity, airport => airport.airlines)
    @JoinTable()
    airports: AirportEntity[];
}
