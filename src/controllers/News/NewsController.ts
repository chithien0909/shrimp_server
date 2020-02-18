import 'reflect-metadata';
import {OK, NOT_FOUND} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Get} from '@overnightjs/core';
import {NewsRepository} from './NewsRepository';

@Controller('api/news')
export class NewsController {
    @Get('getTopNews/:amount')
    private async getTopNews(req: Request, res: Response) {
        const {amount} = req.params ;
        // tslint:disable-next-line:radix
        const news = await NewsRepository.fetchNews(0, parseInt(amount));

        if (!news.length) {
            return res.status(NOT_FOUND).json({
                message: 'Not found!'
            });
        } else {
            return res.status(OK).json({
                data: news,
            });
        }
    }

    @Get('getNews/:start?amount')
    private async getNews(req: Request, res: Response) {
        const {start, amount} = req.params;
        // tslint:disable-next-line:radix
        const news = await NewsRepository.fetchNews(parseInt(start), parseInt(amount));

        if (!news) {
            return res.status(NOT_FOUND).json({
                message: 'Not found! ',
            });
        } else {
            return res.status(OK).json({
                data: news,
            });
        }
    }
}

