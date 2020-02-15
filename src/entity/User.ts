import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';
import { UserRole } from '../enums';


@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
        length: 40,
        unique: true,
    })
    username: string;
    @Column()
    email: string;
    @Column()
    password: string;
    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.GUEST
    })
    role: UserRole;
}