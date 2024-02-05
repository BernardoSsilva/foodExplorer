import { Router } from "express";
import { UserService } from "./user.service";
import { UserController } from "./user.controller";


const userRoute = Router();
const userService = new UserService()
const userController = new UserController(userService)
userRoute.get("/", (req, res) => {
  const result = userController.getAllUsers()
  if(!result){
    res.status(400).send("Bad Request")
  }
  res.send(userController.getAllUsers())
});

userRoute.post("/", (req,res) =>{
  const result = userController.createNewUser(req.body)
  if(!result){
    res.status(400).send("Bad request")
  }
})


export default userRoute;