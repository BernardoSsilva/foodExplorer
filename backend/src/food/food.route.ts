import { Router } from "express";
import { FoodController } from "./food.controller";
import { FoodService } from "./food.service";
import * as jwt from "jsonwebtoken";
import multer from "multer";
import { resourceUsage } from "process";
import { checkToken } from "../middleware/middleware";

const foodRoute = Router();

const upload = multer({ dest: "uploads/" });
const foodService = new FoodService();
const foodController = new FoodController(foodService);

interface DecodedToken {
  userId: string;
  userAdmin: boolean;
}

foodRoute.get("/", checkToken, async (req, res) => {
  const result = await foodController.findAll();
  if(!result){
    return res.status(400).send("Bad Request");
  }
  return res.status(200).send(result);
});

foodRoute.get("/:id", checkToken, async (req, res) => {
  const result = await foodController.findOne(parseInt(req.params.id));
  if(!result){
    return res.status(400).send("Bad Request");
  }
  return res.status(200).send(result);
});

foodRoute.post("/", checkToken, async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "") || " ";

  let userId, userPermission;

  let decoded: DecodedToken;
  try {
    decoded = jwt.verify(token, process.env.mysecret ?? " ") as DecodedToken;
    userId = decoded.userId;
    userPermission = decoded.userAdmin;
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
  if (!userPermission) {
    return res.status(400).send("Bad request");
  }
  const result = await foodController.createNew(userId ?? "", req.body);
  if (!result) {
    return res.status(400).send("Bad request");
  }

  return res.status(200).send(result);
});

foodRoute.post("/:id", checkToken, upload.single("file"), async (req, res) => {
  const result = await foodController.fileUpload(
    parseInt(req.params.id),
    req.file?.originalname ?? "",
    req.file?.filename ?? ""
  );
  if (!result) {
    return res.status(400).send("Bad request");
  }
  return res.status(200).send(result);
});

foodRoute.patch("/:id/update", checkToken, async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "") || " ";

  let userId, userPermission;

  let decoded: DecodedToken;
  try {
    decoded = jwt.verify(token, process.env.mysecret ?? " ") as DecodedToken;
    userId = decoded.userId;
    userPermission = decoded.userAdmin;
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
  if (!userPermission) {
    return res.status(400).send("Bad request");
  }
  const result = await foodController.updateFood(
    parseInt(req.params.id),
    req.body
  );
  if (!result) {
    return res.status(400).send("Bad request");
  }
  res.status(200).send(result);
});

foodRoute.delete("/:id/delete", checkToken, async (req, res) => {
  const token = req.headers.authorization?.replace("Bearer ", "") || " ";

  let userId, userPermission;

  let decoded: DecodedToken;
  try {
    decoded = jwt.verify(token, process.env.mysecret ?? " ") as DecodedToken;
    userId = decoded.userId;
    userPermission = decoded.userAdmin;
  } catch (err) {
    res.status(401).send("Unauthorized");
  }
  if (!userPermission) {
    return res.status(400).send("Bad request");
  }
  const result = await foodController.deleteFood(parseInt(req.params.id));
  if (!result) {
    return res.status(400).send("Bad request");
  }
  res.status(200).send(result);
});
export default foodRoute;
