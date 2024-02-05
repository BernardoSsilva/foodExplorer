import express from "express";
import userRoute from "./user/user.route";

const app = express();

app.use(express.json());
const port = 3000;


app.use("/user", userRoute)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
