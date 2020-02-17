import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';

@Entity()
@Unique(['_id'])
export class Announces {

    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn()
    accountId: ObjectID;

    @Column()
    favorites: ObjectID[];
}