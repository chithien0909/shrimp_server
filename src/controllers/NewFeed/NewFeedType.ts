import {Column, ObjectID, ObjectIdColumn} from 'typeorm';
import DateTimeFormat = Intl.DateTimeFormat;

export interface NewfeedParams{
    start?: number;
    limit?: number;
    order?: string;
}
export interface NewfeedUpdate {
    id?: ObjectID;
    createdAt?: DateTimeFormat;
    updatedAt?: DateTimeFormat;
    accountId?: ObjectID;
    images?: string[];
    movies?: string[];
    title?: string;
    newfeedid?: string;
    newfeedContent?: string;
    newfeedLocation?: string;
    views?: number;
    favorites?: number;
}