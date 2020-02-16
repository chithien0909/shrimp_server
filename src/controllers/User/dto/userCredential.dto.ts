import {IsString, MaxLength, MinLength, Matches} from 'class-validator';

export class UserCredentialDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Password too weak' })
    password: string;
    @MinLength(8)
    @MaxLength(40)
    @Matches(
        /^[a-z][a-z0-9_\.]{5,32}@[a-z0-9]{2,}(\.[a-z0-9]{2,4}){1,2}$/,
        {
            message: 'Email invalid'
        }
    )
    email: string;
    @IsString()
    @MinLength(5)
    @MaxLength(40)
    fullname: string;
}