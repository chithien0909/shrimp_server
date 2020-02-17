import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
export class ShrimpTrades {
    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn()
    shrimpSizeId: ObjectID;

    @ObjectIdColumn()
    newsTypeId: ObjectID;

    @ObjectIdColumn()
    accountId: ObjectID;

    @Column()
    createdAt: DateTimeFormat;

    @Column()
    updatedAt: DateTimeFormat;

    @Column()
    shrimpTradeEstimatedDate: DateTimeFormat;

    @Column()
    shrimpTradeUnit: string;

    @Column()
    shrimpTradeContent: string;

    @Column()
    shrimpTradeEstimatedQuantity: number;
}