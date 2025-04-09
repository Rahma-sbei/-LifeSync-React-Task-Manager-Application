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
// Define endpoints
userRoute.get("/users", getUsers); //This endpoint returns a list of all users

//This endpoint accepts id from URL params, checks if the signed-in user is authenticated and authorized, and returns details of a single user
userRoute.get("/users/:id", isAuth, isAutho(["user", "admin"]), getOneUser);
userRoute.post("/users", postUser); //This endpoint accepts user data from request body, creates a new user
userRoute.put("/users/:id", putUser); //This endpoint accepts id from URL params, updates an existing user's data

//This endpoint accepts id from URL params, checks if the signed-in user is authenticated and authorized as an admin, and deletes a user
userRoute.delete("/users/:id", isAuth, isAutho(["admin"]), deleteUser);
userRoute.post("/signIn", signIn); //This endpoint accepts sign-in credentials from request body and returns a user authentication token
module.exports = userRoute;
