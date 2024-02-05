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
          userAdmin: true,
          userId: true,
          userPassword: true,
        },
      });

      if (!user) {
        return { statusCode: 404, message: "Usuário não encontrado" };
      }

      const checkPassword = await bcrypt.compare(
        user.userPassword,
        userPassword
      );
      if (!checkPassword) {
        return { statusCode: 401, message: "Acesso não autorizado" };
      }

      const { userId, userAdmin } = user;
      const payload = { userId, userAdmin };

      const privatekey = process.env.mysecret ?? "";
      const token = jwt.sign(payload, privatekey, {
        expiresIn: "8h",
      });
    } catch (err) {
      return false;
    }
  }
}
