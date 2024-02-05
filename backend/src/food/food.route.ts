import { Router } from "express";
import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import * as jwt from "jsonwebtoken"
import multer from "multer";
import { resourceUsage } from "process";

const foodRoute = Router();

const upload = multer({ dest: 'uploads/' })
const foodService = new FoodService();
const foodController = new FoodController(foodService);

interface DecodedToken {
    userId: string;
    userAdmin: boolean;
  }


foodRoute.get("/", (req, res) => {
  return res.status(200).send(foodController.findAll());
});


foodRoute.post("/", (req, res) =>{

    const token = req.headers.authorization?.replace("Bearer ", "") || " ";

    let userId;
    let decoded: DecodedToken;
    try {
      decoded = jwt.verify(token, process.env.mysecret ?? " ") as DecodedToken;
      userId = decoded.userId;
    } catch (err) {
      res.status(401).send("Unauthorized");
    }

    const result = foodController.createNew(userId??"", req.body)
    if(!result){
      return res.status(400).send("Bad request")
    }

    return res.status(200).send(JSON.stringify(result))
})

foodRoute.post("/:id", upload.single("file"), (req,res) =>{
  const result = foodController.fileUpload(parseInt(req.params.id), req.file?.originalname??"", req.file?.filename??"")
  if(!result){
    return res.status(400).send("Bad request")
  }
  return res.status(200).send(JSON.stringify(result))
})
export default foodRoute
