import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
export class Comment {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    createdAt: DateTimeFormat;

    @Column()
    updatedAt: DateTimeFormat;

    @ObjectIdColumn()
    postId: ObjectID;

    @ObjectIdColumn()
    userId: ObjectID;

    @Column()
    profilePhoto: string;

    @Column()
    userFullName: string;

    @Column()
    images: string[];

    @Column()
    movies: string[];

    @Column()
    commentsContent: string;
}