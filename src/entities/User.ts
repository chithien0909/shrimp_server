import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import * as bcrypt from 'bcrypt';
import {UserRole} from '../enums';

@Entity()
@Unique(['username'])
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
        enum: [UserRole.GUEST, UserRole.ADMIN, UserRole.EDITOR],
        default: UserRole.GUEST
    })
    roles: UserRole;
    @Column()
    salt: string;
    @Column({
        nullable: true,
        type: 'date'
    })
    created: Date;
    async validatePassword(password: string): Promise<boolean> {
        const hash = await bcrypt.hash(password, this.salt);
        return hash === this.password;
    }
}