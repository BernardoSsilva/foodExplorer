import { prisma } from "../../prisma/client";
import { CreateUserDto } from "./dtos/create.user.dto";

export class UserService {
  async findAll() {
    try {
      const result = await prisma.user.findMany();

      if (!result) {
        return false;
      }

      return result;
    } catch (err) {
      return false;
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
}
