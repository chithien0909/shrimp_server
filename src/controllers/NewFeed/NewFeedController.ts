import 'reflect-metadata';
import {BAD_REQUEST, OK} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Get, Post} from '@overnightjs/core';
import {NewfeedParams, NewfeedUpdate} from './NewFeedType';
import {NewFeedService} from './NewFeedService';
import {getMongoManager, getMongoRepository} from 'typeorm';
import {Newfeeds} from '../../entities/Newfeeds';
import {Announces} from '../../entities/Announces';
import {ObjectID} from 'mongodb';
import {Logger} from '@overnightjs/logger';
import {uptime} from 'os';

@Controller('api/newfeeds')
export class NewFeedController {
    private newFeedService: NewFeedService;
    constructor() {
        this.newFeedService = new NewFeedService();
    }
    @Get('all')
    private async allNewFeeds(req: Request, res: Response) {
        const newFeeds = await this.newFeedService.getAll();
        return res.status(OK).json({
            data: newFeeds,
        });
    }
    @Get('/')
    private async getNewFeeds(req: Request, res: Response) {
        const {start = 0, limit = 5, order = 'ASC'}: NewfeedParams = req.query;
        const options = {
            take: Number(limit),
            skip: Number(start),
            order: {
                createdAt: order
            }
        };
        const newFeeds = await this.newFeedService.getAll(options);
        return res.status(OK).json({
            data: newFeeds,
        });
    }
    @Post(':id')
    private async updateNewFeeds(req: Request, res: Response) {
        const id: ObjectID = new ObjectID(req.params.id);
        const data : NewfeedUpdate = req.body;
        let update;
        try {
            update = await this.newFeedService.updateNewFeed(id, data);
        } catch (error) {
            Logger.Err(error);
            return res.status(BAD_REQUEST).json({
                error
            });
        }
        return res.status(OK).json({
            message: update
        });
    }
    @Get('delete/:id')
    private async deleteNewFeeds(req: Request, res: Response) {
        const id: ObjectID = new ObjectID(req.params.id);
        let deleteResult;
        try {
            deleteResult = await this.newFeedService.deleteNewFeed(id);
        }catch (error) {
            Logger.Err(error);
            return res.status(BAD_REQUEST).json({
                error
            });
        }
        return res.status(OK).json({
            message: deleteResult
        });
    }
}