import 'reflect-metadata';
import {OK, NOT_FOUND} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Get} from '@overnightjs/core';
import {AnnouncesRepository} from './AnnouncesRepository';
import {ObjectID} from 'typeorm';

@Controller('api/announces')
export class NewsController {
    @Get('getAnnounces')
    private async getAnnounces(req: Request, res: Response) {
        const {accountId} = req.params;
        // tslint:disable-next-line:max-line-length
        const announces = await AnnouncesRepository.fetchAnnounces(ObjectID.createFromHexString(accountId));

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

