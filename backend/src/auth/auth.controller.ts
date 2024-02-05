import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
export class AuthController{
    constructor(private authService: AuthService){}


    async login(authDto:AuthDto){
        let {userEmail, userPassword} = authDto
        return await this.authService.login(userEmail, userPassword)
    }

}