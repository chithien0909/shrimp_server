import {Column, Entity, ObjectID, ObjectIdColumn, Unique} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

@Entity()
@Unique(['_id'])
export class ShrimpAd {
    @ObjectIdColumn()
    _id: ObjectID;

    @ObjectIdColumn()
    shrimpAdsId: ObjectID;

    @ObjectIdColumn()
    shrimpTypeId: ObjectID;

    @ObjectIdColumn()
    newsTypeId: ObjectID;

    @ObjectIdColumn()
    accountId: ObjectID;

    @Column()
    createdAt: DateTimeFormat;

    @Column()
    updatedAt: DateTimeFormat;

    @Column()
    shrimpAdsEnviroment: string;

    @Column()
    shrimpAdsShelfLife: string;

    @Column()
    shrimpAdsContent: string;

    @Column()
    shrimpAdsUnit: string;

    @Column()
    shrimpAdsPricePerUnit: number;

    @Column()
    shrimpAdsMinOrder: number;
}