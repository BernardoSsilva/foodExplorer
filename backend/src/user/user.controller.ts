import { CreateUserDto } from "./dtos/create.user.dto";
import { EditUserDto } from "./dtos/edit.user.dto";
import { UserService } from "./user.service";
import bcrypt from "bcrypt"

export class UserController{
    constructor(private userService:UserService){}


    getAllUsers(){
        return this.userService.findAll();
    }

    getUserById(id:string){
        return this.userService.findById(id)
    }

    async createNewUser(createUserDto: CreateUserDto){
        let {userName, userEmail, userPassword} = createUserDto
        userPassword = await bcrypt.hash(userPassword, 10)
        return await this.userService.createUser(userName, userEmail, userPassword)
    }

    async editUser(id:string, {userName, userEmail, userPassword}:EditUserDto){
        if (userPassword){
            userPassword = await bcrypt.hash(userPassword, 10)
        }
        return this.userService.editUser(id, userName, userEmail, userPassword)
    }

    deleteUser(id:string){
        return this.userService.deleteUser(id)
    }

}