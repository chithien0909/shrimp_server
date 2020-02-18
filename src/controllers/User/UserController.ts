import 'reflect-metadata';
import {BAD_REQUEST, OK} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Get, Middleware, Post} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {UserCredentialDto} from './dto/userCredential.dto';
import {JwtManager, ISecureRequest} from '@overnightjs/jwt';
import {UserService} from './UserService';
import { UserTypes} from './UserTypes';

@Controller('api/users')
export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    @Get('all')
    private async allUser(req: Request, res: Response) {
        const users = this.userService.getAll(['id', 'email', 'fullname', 'roles']);
        return res.status(OK).json({
            data: users,
        });
    }
    @Get(':id')
    private async userById(req: Request, res: Response) {
        const { id } = req.params;
        const user: UserTypes = await this.userService.getById(id);
        Logger.Info('Get user by id' + id);
        if(user) {
            return res.status(OK).json({
              username: user.username,
              fullname: user.fullname,
              email: user.email,
              created: user.created
            });
        }
        return res.status(BAD_REQUEST).json({
            message: 'User not existed',
        });
    }
    @Get('info')
    @Middleware(JwtManager.middleware)
    private async currentUser(req: ISecureRequest, res: Response) {
        Logger.Info(req.payload, true);
        return res.status(OK).json(req.payload);
    }
    @Post('register')
    private async register(req: Request, res: Response) {
        Logger.Info(req.body);
        const { username, email, password, fullname }: UserCredentialDto = req.body;
        const result = await this.userService.createUser(
            {username, email, password, fullname }
        );
        if(result){
            return res.status(OK).json(result);
        }
        return res.status(BAD_REQUEST).json(result);
    }
    @Post('login')
    private async login(req: Request, res: Response) {
        Logger.Info(req.body);
        const result = await this.userService.createUser(req.body);
        if(result) {
            const jwtStr = JwtManager.jwt({
                username: result.username,
                email: result.email,
                fullname: result.email,
                created: result.created,
                roles: result.roles,
            });
            return res.status(OK).json({
                token: jwtStr
            });
        }
        return res.status(BAD_REQUEST).json({
            message: 'username or password incorrect',
        });
    }
}