import { prisma } from "../../prisma/client"

export class UserService{
    async findAll(){
        try{
            const result = prisma.user.findMany()

            if(!result){
                return false
            }

            return result
        }catch(err){
            return false
        }
    }
}