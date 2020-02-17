import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
@Unique(['_id'])
export class News {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    createdAt: DateTimeFormat;

    @Column()
    updatedAt: DateTimeFormat;

    @Column()
    title: string;

    @Column()
    url: string;

    @Column()
    image: string;
}