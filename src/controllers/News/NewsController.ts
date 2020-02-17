import * as bcrypt from 'bcrypt';
import 'reflect-metadata';
import {BAD_REQUEST, OK} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Get} from '@overnightjs/core';
import {getMongoManager} from 'typeorm';
import {News} from '../../entities/News';
@Controller('api/news')
export class NewsController {
    @Get('getAll')
    private async getAllUser(req: Request, res: Response) {
        const manager = getMongoManager();
        const news = await manager.find(News);
        return res.status(OK).json({
            data: news,
        });
    }
}