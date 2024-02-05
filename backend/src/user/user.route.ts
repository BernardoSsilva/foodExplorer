import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";

const userRoute = Router();
const userService = new UserService();
const userController = new UserController(userService);
userRoute.get("/", async (req, res) => {
  const result = await userController.getAllUsers();
  if (!result) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  res.status(200).send(userController.getAllUsers())
});

userRoute.get("/:id", async (req, res) => {
  const result = await userController.getUserById(req.params.id);
  if (!result) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  res.status(200).send(result)
})
userRoute.post("/", (req,res) =>{
  const result = userController.createNewUser(req.body)
  if(!result){
    res.status(400).send("Bad request")
  }
  res.status(201).send(result);
});

userRoute.patch("/:id", async (req, res) => {
  const result = await userController.editUser(req.params.id, req.body);
  if (!result) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  res.status(200).send(result);
});

userRoute.delete("/:id", async (req, res) => {
  const result = await userController.deleteUser(req.params.id);
  if (!result) {
    res.status(400).json({ message: "Bad request" });
    return;
  }
  res.status(200).send(result)
})


export default userRoute;
