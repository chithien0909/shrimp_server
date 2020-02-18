import {Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
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