import MonthControl from "../models/control.model.js";

export const GetMonths = async (req, res) => {
  try {
    const Data = await MonthControl.find();
    console.log(Data);
    res.status(200).json(Data);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const GetMonth = async (req, res) => {
  try {
    const { id } = req.params
    const Month = await MonthControl.findById(id).exec()

    res.status(200).json(Month)
  } catch (error) {
    res.status(404).json({ message : error.message })
  }
}


export const CreateMonth = async (req, res) => {
  try {
    const { Month, Year, Goal } = req.body;
    let MonthDays = new Date(Year, Month, 0).getDate();
    let DailyGoal = Math.trunc(Goal / MonthDays);
    let DailySale = Array(MonthDays).fill(0);
    let _id = Month + "-" + Year
    let Day = 0
    let GoalAtDay= DailyGoal * (Day + 1);
    let SelledAtDay= DailySale.reduce((sum, num) => sum + num);
    let PercentageAtDay= SelledAtDay / GoalAtDay;
    let TotalPercentage= SelledAtDay / Goal;
    let GoalDiff= SelledAtDay - Goal;
    let GoalCorrection= DailyGoal;
    let Summary = {
      "Day": Day,
      "GoalAtDay": GoalAtDay,
      "SelledAtDay": SelledAtDay,
      "PercentageAtDay": PercentageAtDay,
      "TotalPercentage": TotalPercentage,
      "GoalDiff": GoalDiff,
      "GoalCorrection": GoalCorrection
    }

    const NewMonth = new MonthControl({
      _id,
      Month,
      Year,
      Goal,
      DailyGoal,
      DailySale,
      Summary
    });


    

    await NewMonth.save();

    res.status(201).json(NewMonth);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DailySale = async (req, res) => {
  try {
    const { id } = req.params;
    let Month = await MonthControl.findById(id).exec();

    let MonthDays = new Date(Month.Year, Month.Month, 0).getDate(); 

    Month.DailySale[Month.Summary.Day] = req.body.AmountSold;

    Month.Summary.Day = Month.Summary.Day + 1

    Month.Summary.GoalAtDay = Month.DailyGoal * Month.Summary.Day
    Month.Summary.SelledAtDay= Month.DailySale.reduce((sum, num) => sum + num);
    Month.Summary.PercentageAtDay= ((Month.Summary.SelledAtDay / Month.Summary.GoalAtDay).toFixed(4)) * 100;
    Month.Summary.TotalPercentage= ((Month.Summary.SelledAtDay / Month.Goal).toFixed(4)) * 100;
    Month.Summary.GoalDiff= Month.Summary.SelledAtDay - Month.Goal;
    Month.Summary.GoalCorrection= Math.trunc(Math.abs(Month.Summary.GoalDiff) / (MonthDays - Month.Summary.Day));

    await MonthControl.findByIdAndUpdate(id, Month);

    res.status(200).json(Month)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const DeleteMonth = async (req, res) => {
  try {
    const { id } = req.params
    let todelete = await MonthControl.findByIdAndDelete(id)

    res.status(200).json(todelete)
  } catch (error) {
    res.status(404).json({ message : error.message })
  }
}
