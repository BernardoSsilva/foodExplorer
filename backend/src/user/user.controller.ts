import { CreateUserDto } from "./dtos/create.user.dto";
import { UserService } from "./user.service";
import bcrypt from "bcrypt"

export class UserController{
    constructor(private userService:UserService){}


    getAllUsers(){
        return this.userService.findAll();
    }

    async createNewUser(createUserDto: CreateUserDto){
        let {userName, userEmail, userPassword} = createUserDto
        userPassword = await bcrypt.hash(userPassword, 10)
        return this.userService.createUser(userName, userEmail, userPassword)
    }
}