import {IsString, MaxLength, MinLength, Matches} from 'class-validator';

export class UserLoginCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    password: string;
}