import mongoose from "mongoose";

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
    PercentageAtDay: { type: Number, required: true },
    TotalPercentage: {type: Number, required: true},
    GoalDiff: {type: Number, required: true},
    GoalCorrection: {type: Number, required: true}
  },
});

export default mongoose.model("MonthControl", MonthSchema);
