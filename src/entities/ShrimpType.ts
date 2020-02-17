import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
export class ShrimpType {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    shrimpTypeName: string;

    @Column()
    createdAt: DateTimeFormat;

    @Column()
    updatedAt: DateTimeFormat;

    @Column()
    shrimpTypeDescription: string;
}