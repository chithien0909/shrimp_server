import {IsNumber} from 'class-validator';

export class NewsCredentialDto extends ParamsDictionary{
    @IsNumber()
    amount: string;

    @IsNumber()
    start: string;
}