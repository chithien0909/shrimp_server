import {getMongoManager, getMongoRepository, MongoRepository} from 'typeorm';
import {Newfeeds} from '../../entities/Newfeeds';
import {NewfeedUpdate} from './NewFeedType';

export class NewFeedRepository extends MongoRepository<Newfeeds>{
    private _manager:MongoRepository<Newfeeds> = getMongoRepository(Newfeeds);
    public async select(options = {}){
        return await this._manager.find(options);
    }
    public async getOne(options?){
        return await this._manager.findOne(options);
    }
    public async updateData(id ,data: NewfeedUpdate){
        return await this._manager.findOneAndUpdate({_id: id}, {
            $set: {
                title: data.title,
                newfeedContent: data.newfeedContent,
                newfeedLocation: data.newfeedLocation,
                images: data.images
            }
        },);
    }
    public async removeOne(id){
        return await this._manager.deleteOne({
            _id: id
        });
    }
}