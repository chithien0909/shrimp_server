import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
export class ShrimpSize {
    @ObjectIdColumn()
    _id: ObjectID;

    @Column()
    shrimpTypeImage: string;

    @Column()
    createdAt: DateTimeFormat;

    @Column()
    updatedAt: DateTimeFormat;

    @Column()
    shrimpSizeUnit: string;

    @Column()
    shrimpSizeQuantity: number;

}