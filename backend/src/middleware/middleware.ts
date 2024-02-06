import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
export async function checkToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  let token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return { message: "unauthorized", statusCode: 401 };

  try {
    const decoded = jwt.verify(token, process.env.mysecret ?? "");

    res.locals.userId = decoded.sub;
    next();
  } catch (err) {
    return res.status(401).send("unauthorized");
  }
}
