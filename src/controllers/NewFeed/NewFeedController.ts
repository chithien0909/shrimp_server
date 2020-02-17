import 'reflect-metadata';
import {BAD_REQUEST, OK} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Get} from '@overnightjs/core';
import {NewFeedParams} from './NewFeedType';
import {NewFeedService} from './NewFeedService';
@Controller('api/newfeeds')
export class NewFeedController {
    @Get('all')
    private async allNewFeeds(req: Request, res: Response) {
        const newFeeds = await NewFeedService.getAll();
        return res.status(OK).json({
            data: newFeeds,
        });
    }
    @Get('/')
    private async getNewFeeds(req: Request, res: Response) {
        const {start = 0, limit = 5, order = 'ASC'}: NewFeedParams = req.query;
        const options = {
            take: Number(limit),
            skip: Number(start),
            order: {
                createdAt: order
            }
        };
        const newFeeds = await NewFeedService.getAll(options);
        return res.status(OK).json({
            data: newFeeds,
        });
    }
}