import {News} from '../../entities/News';
import {getMongoManager, Repository} from 'typeorm';

export class NewsRepository extends Repository<News> {
    static async fetchNews(start: number, amount: number) {
        const manager = getMongoManager();
        try {
            return await manager.find(News, {
                order: {
                    createdAt: 'DESC'
                },
                // tslint:disable-next-line:radix
                skip: start || 0,
                // tslint:disable-next-line:radix
                take: amount,
                cache: true
            });
        } catch (err) {
            return null;
        }
    }
}