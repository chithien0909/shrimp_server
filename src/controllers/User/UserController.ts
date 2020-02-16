import * as bcrypt from 'bcrypt';
import 'reflect-metadata';
import {BAD_REQUEST, OK} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Delete, Get, Middleware, Post, Put} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {User} from '../../entities/User';
import {getMongoManager} from 'typeorm';
import {UserRepository } from '../../repositories/UserRepository';
import {UserLoginCredentialDto} from './dto/userLoginCredential.dto';
import {UserCredentialDto} from './dto/userCredential.dto';
import {JwtManager, ISecureRequest} from '@overnightjs/jwt';
@Controller('api/users')
export class UserController {
    @Get('getAll')
    private async getAllUser(req: Request, res: Response) {
        const manager = getMongoManager();
        const users = await manager.find(User);
        return res.status(OK).json({
            data: users,
        })
    }
    @Get(':id')
    @Middleware(JwtManager.middleware)
    private async getUserById(req: ISecureRequest, res: Response) {
        const { id } = req.params;
        const manager = getMongoManager();
        const user: UserCredentialDto = await manager.findOne(id);
        if(user) {
            return res.status(OK).json({
              username: user.username,
              fullname: user.fullname,
              email: user.email,
            });
        }
        return res.status(BAD_REQUEST).json({
            message: 'User not existed',
        });
    }
    @Post('create')
    private async createUser(req: Request, res: Response) {
        Logger.Info(req.body);
        const { username, email, password, fullname }: UserCredentialDto = req.body;
        const result = await UserRepository.createUser(
            { username, email, password, fullname }
        );
        return res.status(result.status).json(result);
    }
    @Post('login')
    private async login(req: Request, res: Response) {
        Logger.Info(req.body);
        const {username, password} = req.body;
        const result = await UserRepository.loginUser({
            username,
            password
        });
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