var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const boardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  ],

  tasks: {
    type: [String],
    required: true,
  },
});
module.exports = mongoose.model("TaskBoards", boardSchema);
