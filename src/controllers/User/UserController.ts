import * as bcrypt from 'bcrypt';
import 'reflect-metadata';
import {BAD_REQUEST, OK} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Delete, Get, Post, Put} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {User} from '../../entities/User';
import {getMongoManager} from 'typeorm';
import {UserRepository } from '../../repositories/UserRepository';

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
    @Post('create')
    private async createUser(req: Request, res: Response) {
        Logger.Info(req.body);
        const { username, email, password, fullname } = req.body;
        const userRepository = new UserRepository();
        const result = await userRepository.createUser(
            { username, email, password, fullname }
        );
        return res.status(result.status).json(result);
    }
    @Put(':msg')
    private putMessage(req: Request, res: Response) {
        Logger.Info(req.params.msg);
        return res.status(400).json({
            error: req.params.msg,
        });
    }

    @Delete(':msg')
    private delMessage(req: Request, res: Response) {
        try {
            throw new Error(req.params.msg);

        } catch (err) {
            Logger.Err(err, true);
            return res.status(400).json({
                error: req.params.msg,
            });
        }
    }

}