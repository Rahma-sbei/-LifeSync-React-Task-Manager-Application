const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//This handles retrieves all users from the database
//return a list of all user objects
const getUsers = async (request, response) => {
  try {
    const users = await User.find();
    if (users && users.length > 0) {
      response.status(200).json({ users: users });
    } else {
      response.status(404).json({ msg: "No users found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error on getting users" });
  }
};

//This handle accepts user id from url params
//returns the specific user
const getOneUser = async (req, res) => {
  const id = req.params.id;
  try {
    //find user in the databse by its id
    const foundUser = await User.findById(id);
    if (foundUser) {
      res.status(200).json({ user: foundUser });
    } else {
      res.status(404).json({ msg: "No user found with the given ID" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Error on retrieving the user" });
  }
};

//This handler accepts a user object from request body
//Saves it to the database
const postUser = async (request, response) => {
  const user = request.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      response.status(400).json({ msg: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(user.password, 10); //encrypt passwords for secure processing
      const newUser = new User({ ...user, password: hashedPassword });
      await newUser.save();
      response
        .status(200)
        .json({ user: newUser, msg: "User successfully added" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ msg: "Error on adding user" });
  }
};

//This handler accepts the user object
//checks the existance of the user in the database
//creates a JWT token with user id and role
//returns the created token
const signIn = async (req, res) => {
  const user = req.body;
  try {
    const foundUser = await User.findOne({ email: user.email });
    if (foundUser) {
      const isMatch = await bcrypt.compare(user.password, foundUser.password); //Compare given password with stored hashed password
      if (isMatch) {
        //generate a JWT token with user's ID and role
        const token = jwt.sign(
          { id: foundUser._id, role: foundUser.role },
          process.env.JWT_SECRET
        );
        res.status(200).json({ token: token });
      } else {
        res.status(400).json({ msg: "Wrong password" });
      }
    } else {
      return res.status(400).json({ msg: "User not registered" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
};

//This handle accepts user id from url params and the new user info from request body
//Updates the user with the retrieved info
const putUser = async (req, res) => {
  const id = req.params.id;
  const user = req.body;
  console.log(user);
  try {
    await User.findByIdAndUpdate(id, user);
    res.status(200).json({ msg: "update successful" });
  } catch (error) {
    res.status(500).json({ msg: "error on updating user" });
  }
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  try {
    await User.findByIdAndDelete(id);
    res.status(200).json({ msg: "delete done" });
  } catch (error) {
    res.status(500).json({ msg: "error on deleting user" });
  }
};
module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
  getOneUser,
  signIn,
};
