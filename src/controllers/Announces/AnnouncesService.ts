import {getMongoManager, Repository} from 'typeorm';
import {Announces} from '../../entities/Announces';
import {ObjectID} from 'mongodb';
import {Logger} from '@overnightjs/logger';

export class AnnouncesService extends Repository<Announces> {
    public async fetchAnnounces(accountId: ObjectID) {
        const manager = getMongoManager();
        try {
            return await manager.findOne(Announces,
                {
                    where: {
                        accountId
                    }
                }
            );
        } catch (err) {
            return null;
        }
    }

    public async removePost(accountId: ObjectID, fav: ObjectID) {
        const manager = getMongoManager();
        try {
            return await manager.findOneAndUpdate(Announces, {
                accountId
            }, {
                $pull: {
                    favorites: fav
                }
            },);
        } catch (err) {
            return null;
        }
    }

    public async newPost(accountId: ObjectID, fav: ObjectID) {
        const manager = getMongoManager();
        try {
            return await manager.findOneAndUpdate(Announces, {
                accountId
            }, {
                $push: {
                    favorites: fav
                }
            },);
        } catch (err) {
            return null;
        }
    }
}