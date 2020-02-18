import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import {SensorDetail} from './SensorDetail';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
export class Sensors {
    @ObjectIdColumn()
    _id: ObjectID;
    @Column()
    waterTemporature: string;
    @Column()
    oxygenSaturation: string;

    @Column()
    salinity: string;
    @Column()
    createdAt: DateTimeFormat;
    @Column()
    updateAt: DateTimeFormat;

}