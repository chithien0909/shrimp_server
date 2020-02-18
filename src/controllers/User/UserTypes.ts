export interface UserTypes {
    username: string;
    password: string;
    email: string;
    created: Date;
    fullname: string;
}

export interface UserResult {
    status?: number;
}