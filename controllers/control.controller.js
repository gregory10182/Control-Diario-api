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
    let DailySale = Array(MonthDays).fill({
      "Venta" : 0,
      "Bonificacion" : 0
    });
    let _id = Month + "-" + Year
    let Day = 1
    let GoalAtDay= DailyGoal * (Day + 1);
    let SelledAtDay= 0
    let Summary = {
      "Day": Day,
      "GoalAtDay": GoalAtDay,
      "SelledAtDay": SelledAtDay,
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
    let data = req.body;

    let Month = await MonthControl.findById(data._id).exec();

    let Day = new Date()

    if(Day.getMonth() + 1 > parseInt(Month.Month)){
      console.log("hola")
      Month.Summary.Day = new Date(Month.Year, Month.Month, 0).getDate()
    }else{
      Month.Summary.Day = Day.getDate() - 1
    }

    Month.DailySale = data.DailySale;
    Month.Summary.GoalAtDay = Month.DailyGoal * Month.Summary.Day
    Month.Summary.SelledAtDay= Math.trunc(Month.DailySale.map(venta => venta.Venta + (venta.Bonificacion / 1.19)).reduce((sum, num) => sum + num));


    
    await Month.save();

    res.status(200).json(Month)
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};


export const UpdateDay = async (req, res) => {
  try{
    let Month = await MonthControl.findById(req.params.id).exec();

    let Day = new Date();

    if(Day.getMonth() + 1 > parseInt(Month.Month)){
      console.log("hola")
      Month.Summary.Day = new Date(Month.Year, Month.Month, 0).getDate()
    }else{
      Month.Summary.Day = Day.getDate() - 1
    }

    Month.Summary.GoalAtDay = Month.DailyGoal * Month.Summary.Day

    await Month.save();

    res.status(200).json(Month)
  } catch (error){
    res.status(404).json({ message: error.message });
  }
}


export const DeleteMonth = async (req, res) => {
  try {
    const { id } = req.params
    let todelete = await MonthControl.findByIdAndDelete(id)

    res.status(200).json(todelete)
  } catch (error) {
    res.status(404).json({ message : error.message })
  }
}
