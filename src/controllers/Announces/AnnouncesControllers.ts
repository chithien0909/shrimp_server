import 'reflect-metadata';
import {OK, NOT_FOUND} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Delete, Get} from '@overnightjs/core';
import {AnnouncesService} from './AnnouncesService';
import {ObjectID} from 'mongodb';

@Controller('api/announces')
export class AnnouncesController {
    service: AnnouncesService;

    constructor() {
        this.service = new AnnouncesService();
    }

    @Get('getAll')
    private async getAnnounces(req: Request, res: Response) {
        const {accountId} = req.query;
        // tslint:disable-next-line:max-line-length
        const announces = await this.service.fetchAnnounces(ObjectID(accountId));

        if (!announces) {
            return res.status(NOT_FOUND).json({
                message: 'Not found!'
            });
        } else {
            return res.status(OK).json({
                data: announces,
            });
        }
    }

    @Get('delete')
    private async deletePostFromAnnounces(req: Request, res: Response) {
        const {accountId, postId} = req.query;
        // tslint:disable-next-line:max-line-length
        const announces = await this.service.removePost(ObjectID.createFromHexString(accountId), ObjectID.createFromHexString(postId));

        if (!announces) {
            return res.status(NOT_FOUND).json({
                message: 'Not found!'
            });
        } else {
            return res.status(OK).json({
                data: announces,
            });
        }
    }

    @Get('append')
    private async appendPostFromAnnounces(req: Request, res: Response) {
        const {accountId, postId} = req.query;
        // tslint:disable-next-line:max-line-length
        const announces = await this.service.newPost(ObjectID.createFromHexString(accountId), ObjectID.createFromHexString(postId));

        if (!announces) {
            return res.status(NOT_FOUND).json({
                message: 'Not found!'
            });
        } else {
            return res.status(OK).json({
                data: announces,
            });
        }
    }
}

