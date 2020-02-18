import {getMongoRepository, MongoRepository} from 'typeorm';
import {Newfeeds} from '../../entities/Newfeeds';

export class NewFeedRepository extends MongoRepository<Newfeeds>{
    private _manager:MongoRepository<Newfeeds> = getMongoRepository(Newfeeds);
    public async select(options = {}){
        return await this._manager.find(options);
    }
}