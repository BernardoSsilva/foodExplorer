import bcrypt from "bcrypt";
import { prisma } from "../../prisma/client";
import * as jwt from "jsonwebtoken";
import "dotenv/config";

export class AuthService {
  async login(userEmail: string, userPassword: string) {
    try {
      const user = await prisma.user.findUnique({
        where: { userEmail },
        select: {
          userEmail: true,
          userName: true,
          userAdmin: true,
          userId: true,
          userPassword: true,
        },
      });

      if (!user) {
        return { statusCode: 404, message: "Usuário não encontrado" };
      }

      console.log(user);
      const checkPassword = await bcrypt.compareSync(
        userPassword,
        user.userPassword
      );

      if (!checkPassword) {
        return { statusCode: 401, message: "Acesso não autorizado" };
      }

      const { userId, userAdmin } = user;

      const privatekey = process.env.mysecret ?? "";
      const token = jwt.sign({userId, userAdmin}, privatekey, {
        expiresIn: "8h",
      });

      return JSON.stringify(token);
    } catch (err) {
      return false;
    }
  }
}
