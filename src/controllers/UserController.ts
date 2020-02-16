import { Request, Response } from 'express';
import { Controller, Middleware, Get, Put, Post, Delete } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import { User } from '../entity/User';
import {getMongoManager} from 'typeorm';

@Controller('')
export class UserController {
    @Get('/users')
    private getAllUser(req: Request, res: Response) {
        // const user: User = new User();
    }


    @Post(':msg')
    private async createUser(req: Request, res: Response) {
        // const user: User = new User();
        // user.fullname = req.body.fullname;
        // user.email = req.body.email;
        // user.password = req.body.password;
        // user.roles = req.body.roles;
        // user.username = req.body.username;
        // const manager = getMongoManager();
        // await manager.save(user);
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