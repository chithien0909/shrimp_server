import {NewFeedRepository} from './NewFeedRepository';

export class NewFeedService {
    private newFeedRepository: NewFeedRepository;
    constructor(){
        this.newFeedRepository = new NewFeedRepository();
    }
    public async getAll(options = {}){
        return await this.newFeedRepository.select(options);
    }
}


