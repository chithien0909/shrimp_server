import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';

@Entity()
export class Announces {
    @ObjectIdColumn()
    _id: ObjectID;
    @ObjectIdColumn()
    accountId: ObjectID;

    @Column()
    favorites: ObjectID[];
}