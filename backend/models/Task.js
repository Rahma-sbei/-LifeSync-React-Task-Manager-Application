const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  taskName: {
    type: String,
    required: true,
  },
  taskDesc: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  deadline: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2}-\d{2}-\d{4}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid date format! Please use dd-mm-yyyy.`,
    },
  },
  currentDate: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        return /^0[1-7]$/.test(v);
      },
      message: (props) => `${props.value} is not a valid day.`,
    },
  },
  status: {
    type: String,
    enum: ["Incomplete", "Complete"],
    required: true,
    default: "Incomplete",
  },
});

const Task = mongoose.model("Tasks", taskSchema);
module.exports = Task;
