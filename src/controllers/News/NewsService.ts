import {FindManyOptions} from 'typeorm/find-options/FindManyOptions';
import {News} from '../../entities/News';
import {getMongoManager} from 'typeorm';

export class NewsService {
    public async getNews (optionsOrConditions?: FindManyOptions<News> | Partial<News>){
        const manager = getMongoManager();
        try {
            return await manager.find(News, optionsOrConditions);
        } catch (err) {
            return null;
        }
    }
}