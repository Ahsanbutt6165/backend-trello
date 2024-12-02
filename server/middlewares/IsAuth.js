import jwt from "jsonwebtoken";
import TryCatch from "../utils/TryCatch.js";
import { User } from "../models/User/UserModel.js";

export const isAuth = TryCatch(async (req, res, next) => {
  const token = req.cookies.token;

  console.log("================Step 1====================");
  console.log({ req: req });

  if (!token) return res.status(403).json({ message: "please login" });
  console.log("=================Step 2===================");

  const decodedData = jwt.verify(token, process.env.JWT_SEC);
  console.log("=================Step 3===================");
  if (!decodedData) return res.status(403).json({ message: "token expired" });

  console.log("=================Step 4===================");
  req.user = await User.findById(decodedData.id);

  console.log("=================Step 5===================");
  next();
});
