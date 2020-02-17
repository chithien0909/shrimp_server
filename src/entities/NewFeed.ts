import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
@Unique(['_id'])
export class NewFeed {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    createdAt: DateTimeFormat;

    @Column()
    updatedAt: DateTimeFormat;

    @ObjectIdColumn()
    postId: ObjectID;

    @ObjectIdColumn()
    accountId: ObjectID;

    @Column()
    profilePhoto: string;

    @Column()
    userFullName: string;

    @Column()
    images: string[];

    @Column()
    movies: string[];

    @Column()
    title: string;

    @Column()
    newfeedContent: string;

    @Column()
    newfeedLocation: string;

    @Column()
    views: number;

    @Column()
    favorites: number;
}