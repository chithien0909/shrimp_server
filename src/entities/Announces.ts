import {Column, Entity, ObjectIdColumn, Unique} from 'typeorm';
import {ObjectID} from 'mongodb';

@Entity()
export class Announces {
    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn()
    accountId: ObjectID;

    @Column()
    favorites: ObjectID[];
}