import { prisma } from "../../prisma/client";
import { CreateUserDto } from "./dtos/create.user.dto";

export class UserService {
  async findAll() {
    try {
      const result = await prisma.user.findMany({
        select:{
            userName:true,
            userEmail:true,
            userAdmin:true
        }
      });

      if (!result) {
        return false;
      }

      return result;
    } catch (err) {
      return false;
    }
  }

  async findById(userId:string){
    try{
        const result = await prisma.user.findUnique({
            where:{
                userId
            },
            select:{
                userName:true,
                userEmail:true,
                userAdmin:true
            }
        })

        if(!result){
            return false
        } 
        return result
    }catch(err){
        return false
    }
  }

  async createUser(userName: string, userEmail: string, userPassword: string) {
    try {
      const result = await prisma.user.create({
        data: {
          userName,
          userEmail,
          userPassword,
        },
      });

      if (!result) {
        return false;
      }

      return result
    } catch (err) {
      return false;
    }
  }

  async editUser(userId:string, userName:string | undefined, userEmail: string | undefined, userPassword: string | undefined){
    try{
        const result = await prisma.user.update({
            where:{userId},
            data:{
                userName,
                userEmail,
                userPassword
            }
        })

    }catch(err){
        return false
    }
  }
}
