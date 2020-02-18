import 'reflect-metadata';
import {OK, NOT_FOUND} from 'http-status-codes';
import {Request, Response} from 'express';
import {Controller, Get} from '@overnightjs/core';
import {NewsTypes} from './NewsTypes';
import {NewsService} from './NewsService';

@Controller('api/news')
export class NewsController {
    private service: NewsService;

    constructor() {
        this.service = new NewsService();
    }

    @Get('getTopNews')
    private async getTopNews(req: Request, res: Response) {
        const {start = 0, amount}: NewsTypes = req.query;
        const news = await this.service.getNews({
            order: {
                createdAt: 'DESC'
            },
            skip: Number(start),
            take: Number(amount),
            cache: true
        });

        if (!news || !news.length) {
            return res.status(NOT_FOUND).json({
                message: 'Not found!'
            });
        } else {
            return res.status(OK).json({
                data: news,
            });
        }
    }

    @Get('/')
    private async getNews(req: Request, res: Response) {
        const {start = 0, amount = 5}: NewsTypes = req.query;
        const news = await this.service.getNews({
            order: {
                createdAt: 'DESC'
            },
            skip: Number(start),
            take: Number(amount),
            cache: true
        });
        if (!news || !news.length) {
            return res.status(NOT_FOUND).json({
                message: 'Not found! ',
                data: null,
            });
        } else {
            return res.status(OK).json({
                data: news,
            });
        }
    }
}

