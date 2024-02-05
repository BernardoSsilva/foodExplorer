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
  res.status(200).send(userController.getAllUsers())
});

userRoute.get("/:id", (req,res)=>{
  const result = userController.getUserById(req.params.id)
  if(!result){
    res.status(400).send("Bad request")
  }
  res.status(200).send(result)
})
userRoute.post("/", (req,res) =>{
  const result = userController.createNewUser(req.body)
  if(!result){
    res.status(400).send("Bad request")
  }
  res.status(201).send(result)
})

userRoute.patch("/:id", (req,res) =>{
  const result = userController.editUser(req.params.id, req.body)
  if(!result){
    res.status(400).send("Bad request")
  }
  res.status(200).send(result)
})


export default userRoute;