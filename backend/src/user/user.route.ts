import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";
import { checkToken } from "../middleware/middleware";
import * as jwt from "jsonwebtoken";

const userRoute = Router();
const userService = new UserService();
const userController = new UserController(userService);

interface DecodedToken {
  userId: string;
  userAdmin: boolean;
}
userRoute.get("/", checkToken, async (req, res) => {
  const result = await userController.getAllUsers();
  if (!result) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  res.status(200).send(result);
});

userRoute.get("/:id", checkToken, async (req, res) => {
  const result = await userController.getUserById(req.params.id);
  if (!result) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  res.status(200).send(result);
});
userRoute.post("/", (req, res) => {
  const result = userController.createNewUser(req.body);
  if (!result) {
    res.status(400).send("Bad request");
  }
  res.status(201).send(result);
});

userRoute.patch("/", checkToken, async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "") || " ";

  let userId
  let decoded: DecodedToken;
  try {
    decoded = jwt.verify(token, process.env.mysecret ?? " ") as DecodedToken;
    userId = decoded.userId;
  } catch (err) {
    res.status(400).send("Bad request");
  }

  const result = await userController.editUser(userId??"", req.body);
  if (!result) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  res.status(200).send(result);
});

userRoute.delete("/", checkToken, async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "") || " ";

  let userId
  let decoded: DecodedToken;
  try {
    decoded = jwt.verify(token, process.env.mysecret ?? " ") as DecodedToken;
    userId = decoded.userId;
  } catch (err) {
    res.status(400).send("Bad request");
  }
  const result = await userController.deleteUser(userId??"");
  if (!result) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  res.status(200).send(result);
});

export default userRoute;
