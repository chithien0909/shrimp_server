import {NewFeedRepository} from './NewFeedRepository';
import {NewfeedUpdate} from './NewFeedType';
import {getMongoManager} from 'typeorm';
import {Newfeeds} from '../../entities/Newfeeds';

export class NewFeedService {
    private newFeedRepository: NewFeedRepository;
    constructor(){
        this.newFeedRepository = new NewFeedRepository();
    }
    public async getAll(options = {}){
        return await this.newFeedRepository.select(options);
    }
    public async getById(id){
        return await this.newFeedRepository.getOne(id);
    }
    public async updateNewFeed(id, data: NewfeedUpdate){
        const newfeed: NewfeedUpdate = await this.getById(id);
        if(!data.newfeedContent){
            data.newfeedContent = newfeed.newfeedContent;
        }
        if(!data.newfeedLocation) {
            data.newfeedLocation = newfeed.newfeedLocation;
        }
        if(!data.title) {
            data.title = newfeed.title;
        }
        if(!data.images) {
            data.images = newfeed.images;
        }
        return await this.newFeedRepository.updateData(id, data);
    }
    public async deleteNewFeed(id){
        return await this.newFeedRepository.removeOne(id);
    }
}


