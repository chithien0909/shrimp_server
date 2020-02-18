import {getMongoManager} from 'typeorm';
import {Newfeeds} from '../../entities/Newfeeds';

export class NewFeedService {
    public async getAll(options = {}){
        const manager = getMongoManager();
        return await manager.find(Newfeeds, options);
    }
}