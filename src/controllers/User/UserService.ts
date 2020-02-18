import {UserCredentialDto} from './dto/userCredential.dto';
import {UserRepository} from './UserRepository';


export class UserService{
    private userRepository: UserRepository;
    constructor(){
        this.userRepository = new UserRepository();
    }
    public async getAll(select) {
        return await this.userRepository.select({
            select
        });
    }
    public async getById(id) {
        return await this.userRepository.getOne(id);
    }
    public async createUser(userCredentialDto: UserCredentialDto) {
        const {username, password} = userCredentialDto;
        return await this.userRepository.loginUser({
            username,
            password
        });
    }
}