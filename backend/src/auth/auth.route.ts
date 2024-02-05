import { Router } from "express";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

const authRoute = Router()
const authService = new AuthService();
const authController = new AuthController(authService)

authRoute.post("/", async (req,res) =>{
    const result =await authController.login(req.body)
    if(!result) return res.status(401).end("Unauthorized")
    res.status(200).send(result);
})

export default authRoute                