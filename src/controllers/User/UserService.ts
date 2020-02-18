import {getMongoManager} from 'typeorm';
import {User} from '../../entities/User';
import {UserCredentialDto} from './dto/userCredential.dto';
import {UserRepository} from './UserRepository';


export class UserService{
    public static async getAll(select) {
        const manager = getMongoManager();
        return await manager.find(User, {
            select
        });
    }
    public static async getById(id) {
        const manager = getMongoManager();
        return await manager.findOne(User, id);
    }
    public static async createUser(userCredentialDto: UserCredentialDto) {
        const {username, password} = userCredentialDto;
        return await UserRepository.loginUser({
            username,
            password
        });
    }
}