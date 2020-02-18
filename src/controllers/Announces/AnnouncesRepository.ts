import {getMongoManager, ObjectID, Repository} from 'typeorm';
import {Announces} from '../../entities/Announces';

export class AnnouncesRepository extends Repository<Announces> {
    static async fetchAnnounces (accountId: ObjectID) {
        const manager = getMongoManager();
        try {
            return await manager.findOne(Announces,
                {
                    where: {
                        accountId
                    }
                }
            );
        } catch(err) {
            return null;
        }
    }
}