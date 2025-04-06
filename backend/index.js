const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./configuration/connectDb");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
const boardRoute = require("./routes/boardRoute");
const expenseRoute = require("./routes/expenseRoute");

dotenv.config();

const port = process.env.PORT; // get port
connectDb(); //connect to mongo atlas database
app.use(cors()); //invoque cors for cross origin resource sharing

//start server
app.listen(port, (error) => {
  if (error) {
    console.log("Server Failed");
  } else {
    console.log(`Server Started on port ${port}`);
  }
});

app.use(express.json());
app.use("/api", userRoute);
app.use("/api", taskRoute);
app.use("/api", boardRoute);
app.use("/api", expenseRoute);
