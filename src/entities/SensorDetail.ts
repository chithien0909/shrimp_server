import {Column } from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

export class SensorDetail {
    @Column()
    created_at: DateTimeFormat;
    @Column()
    name: string;
    @Column()
    parameter: string;
    @Column()
    value: number;
    @Column()
    unit: string;
}