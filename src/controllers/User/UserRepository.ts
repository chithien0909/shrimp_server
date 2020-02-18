import {
    Entity, EntityRepository,
    FindManyOptions,
    getMongoManager,
    getMongoRepository,
    MongoRepository,
    Repository
} from 'typeorm';
import { User } from '../../entities/User';
import { UserCredentialDto } from './dto/userCredential.dto';
import { UserRole } from '../../enums';
import { BAD_REQUEST, OK } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
import { UserLoginCredentialDto } from './dto/userLoginCredential.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    private _manager: MongoRepository<User> = getMongoRepository(User);
    public async select(options = {}){
        return await this._manager.find(options);
    }
    public async getOne(options = {}){
        return await  this._manager.findOne(options);
    }
    public async createUser(userCredentialDto: UserCredentialDto): Promise<any> {
        const { username, email, password, fullname } = userCredentialDto;
        const user: User = new User();
        user.fullname = fullname;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await UserRepository.hashPassword(password, user.salt);
        user.roles = UserRole.GUEST;
        user.username = username;
        user.created = new Date();
        try {
            await this._manager.save(user);
            return {
                status: OK,
                message: 'Create user success',
                error: ''
            }
        } catch (e) {
            return {
                status: BAD_REQUEST,
                message: 'Create failed',
                error: e,
            }
        }
    }
    public async loginUser(userLoginCredential: UserLoginCredentialDto) {
        const { username, password } = userLoginCredential;
        const user = await this._manager.findOne({
            username,
        });
        if (user && await user.validatePassword(password)) {
            return {
                username: user.username,
                roles: user.roles,
                fullname: user.fullname,
                created: user.created,
                email: user.email,
            }
        }
        return null;
    }
    public static hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}