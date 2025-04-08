const express = require("express");
const userRoute = express.Router();
//import handler from controller
const {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUser,
  signIn,
} = require("../controllers/userController");
//import middleware
const { isAuth } = require("../middleware/isAuth");
const { isAutho } = require("../middleware/isAutho");
//define endpoints
userRoute.get("/users", getUsers);
userRoute.get("/users/:id", isAuth, isAutho(["user", "admin"]), getOneUser);
userRoute.post("/users", postUser);
userRoute.put("/users/:id", putUser);
userRoute.delete("/users/:id", isAuth, isAutho(["admin"]), deleteUser);
userRoute.post("/signIn", signIn);
module.exports = userRoute;
