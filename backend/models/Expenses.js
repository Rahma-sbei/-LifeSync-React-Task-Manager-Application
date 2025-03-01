var mongoose = require("mongoose");
const Schema = mongoose.Schema;
const expenseSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
    default: false,
  },
});
module.exports = mongoose.model("Expense", expenseSchema);
