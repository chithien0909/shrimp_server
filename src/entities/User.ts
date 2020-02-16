import {Entity, ObjectID, ObjectIdColumn, Column} from 'typeorm';
import { UserRole } from '../enums';

@Entity()
export class User {

    @ObjectIdColumn()
    id: ObjectID;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column()
    email: string;
    @Column()
    fullname: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.GUEST
    })
    roles: UserRole;
}