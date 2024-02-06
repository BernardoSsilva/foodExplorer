import express from "express";
import userRoute from "./user/user.route";
import authRoute from "./auth/auth.route";
import { checkToken } from "./middleware/middleware";
import foodRoute from "./food/food.route";
var cors = require('cors')

const app = express();

app.use(express.json());
app.use(cors())
const port = 3000;

app.use("/login",  authRoute)
app.use("/user", userRoute)
app.use("/food", checkToken, foodRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
