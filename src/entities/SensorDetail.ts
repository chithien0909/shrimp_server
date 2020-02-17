import {Column, Unique, } from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

//     'created_at': '2020-02-16T13:19:38+07:00',
export class SensorDetail {
    @Column()
        // tslint:disable-next-line:variable-name
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