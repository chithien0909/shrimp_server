import { EntityRepository, getMongoManager, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UserCredentialDto } from '../controllers/User/dto/userCredential.dto';
import { UserRole } from '../enums';
import { BAD_REQUEST, OK } from 'http-status-codes';
import * as bcrypt from 'bcrypt';
export class UserRepository extends Repository<User>{
    static async createUser(userCredentialDto: UserCredentialDto): Promise<any> {
        const { username, email, password, fullname } = userCredentialDto;
        const user: User = new User();
        user.fullname = fullname;
        user.email = email;
        user.salt = await bcrypt.genSalt();
        user.password = await UserRepository.hashPassword(password, user.salt);
        user.roles = UserRole.GUEST;
        user.username = username;
        const manager = getMongoManager();
        try {
            await manager.save(user);
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
    public static hashPassword(password: string, salt: string) {
        return bcrypt.hash(password, salt);
    }
}