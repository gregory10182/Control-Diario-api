const mongoose = require("mongoose")

const MonthSchema = mongoose.Schema({
  _id: { type: String, required: true },
  Month: { type: Number, required: true },
  Year: { type: Number, required: true },
  Goal: { type: Number, required: true },
  DailyGoal: { type: Number, required: true },
  DailySale: { type: Object, required: true },
  Summary: {
    Day: { type: Number, required: true },
    GoalAtDay: { type: Number, required: true },
    SelledAtDay: { type: Number, required: true },
  },
});

module.exports = mongoose.model("MonthDev", MonthSchema);
