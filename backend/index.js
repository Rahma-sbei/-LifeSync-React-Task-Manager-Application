const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./configuration/connectDb");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");

dotenv.config();

const port = process.env.PORT;
connectDb();

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
