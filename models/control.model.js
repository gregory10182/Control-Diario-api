const { Schema, model } = require("mongoose");

const MonthSchema = Schema({
  mid: { type: String, required: true},
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
  user: {type: Schema.Types.ObjectId, ref: "UserDev" }
});

MonthSchema.set("toJSON", {
  transform: (document, returnedObject) =>{
      returnedObject.id = returnedObject._id
      delete returnedObject._id
      delete returnedObject.__v
  }
})

const month = model("MonthDev", MonthSchema);

module.exports =  month
