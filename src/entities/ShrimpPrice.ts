import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
@Unique(['_id'])
export class ShrimpPrice {
    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn()
    shrimpTypeId: ObjectID;

    @ObjectIdColumn()
    shrimpSizeId: ObjectID;

    @Column()
    createdAt: DateTimeFormat;

    @Column()
    updatedAt: DateTimeFormat;

    @Column()
    shrimpPriceDate: DateTimeFormat;

    @Column()
    price: number;
}