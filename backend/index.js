const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./configuration/connectDb");
const taskRoute = require("./routes/taskRoute");
const userRoute = require("./routes/userRoute");
const boardRoute = require("./routes/boardRoute");

dotenv.config();

const port = process.env.PORT;
connectDb();
app.use(cors());

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
