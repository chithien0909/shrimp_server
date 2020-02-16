import 'reflect-metadata';
import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { User } from '../entities/User';
import {getMongoManager} from 'typeorm';

@Controller('api/users')
export class UserController {
    @Get('getAll')
    private getAllUser(req: Request, res: Response) {
        // const user: User = new User();
        res.send('Users');
    }
    @Post('create')
    private async createUser(req: Request, res: Response) {

        const user: User = new User();
        user.fullname = req.body.fullname;
        user.email = req.body.email;
        user.password = req.body.password;
        user.roles = req.body.roles;
        user.username = req.body.username;
        const manager = getMongoManager();
        try {
            await manager.save(user);
            return res.status(200).json({
                message: 'Create user success'
            });
        } catch (e) {
            return res.status(400).json({
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