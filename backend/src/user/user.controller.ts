import { UserService } from "./user.service";

export class UserController{
    constructor(private userService:UserService){}


    getAllUsers(){
        return this.userService.findAll();
    }
}