import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
@Unique(['_id'])

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