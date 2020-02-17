
import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import {SensorDetail} from './SensorDetail';

@Entity()
@Unique(['_id'])

// TODO: Column fields type warn
export class Sensor {

    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    0: SensorDetail;

    @Column()
    1: SensorDetail;

    @Column()
    2: SensorDetail;
}