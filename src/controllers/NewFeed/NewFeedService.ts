import {getMongoManager} from 'typeorm';
import {Newfeeds} from '../../entities/Newfeeds';

export class NewFeedService {
    public static async getAll(options = {}){
        return await getMongoManager().find(Newfeeds, options);
    }
}