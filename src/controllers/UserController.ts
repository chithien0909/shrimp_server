import 'reflect-metadata';
import {BAD_REQUEST, OK} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Delete, Get, Post, Put} from '@overnightjs/core';
import {Logger} from '@overnightjs/logger';
import {User} from '../entities/User';
import {getMongoManager} from 'typeorm';
import {UserRole} from '../enums';

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
        const user: User = new User();
        user.fullname = req.body.fullname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.roles = UserRole.GUEST;
        user.username = req.body.username;
        const manager = getMongoManager();
        try {
            await manager.save(user);
            return res.status(OK).json({
                message: 'Create user success'
            });
        } catch (e) {
            return res.status(BAD_REQUEST).json({
                message: 'Create failed',
                error: e,
            });
        }
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