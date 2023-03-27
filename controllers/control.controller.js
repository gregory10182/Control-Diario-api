const MonthControl = require("../models/control.model.js")

const GetMonths = async (req, res, next) => {
  try {
    const Data = await MonthControl.find();
    res.status(200).json(Data);
  } catch (error) {
    next(error);
  }

  // MonthControl.find()
  // .then(result => res.json(result))
  // .catch(err => next(err))
};

const GetMonth = (req, res, next) => {
  // try {
  //   const { id } = req.params
  //   const Month = await MonthControl.findById(id).exec()

  //   res.status(200).json(Month)
  // } catch (error) {
  //   res.status(404).json({ message : error.message })
  // }

  const { id } = req.params

  MonthControl.findById(id)
  .then(result => {
    if(result){
      res.json(result)
    }else{
      res.status(404).end()
    }
  })
  .catch(err => next(err))
}


const CreateMonth = (req, res, next) => {
  
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

  NewMonth.save()
  .then(() => res.send("Mes Creado Exitosamente"))
  .catch(err => next(err))

  
  
};


const DailySale = (req, res, next) => {
  
  // let data = req.body;

  // let Month;
  
  // MonthControl.findById(data._id)
  // .then(result => Month = result)
  // .catch(err => next(err))

  // let Day = new Date()

  // if(Day.getMonth() + 1 > parseInt(Month.Month)){
  //   Month.Summary.Day = new Date(Month.Year, Month.Month, 0).getDate()
  // }else{
  //   Month.Summary.Day = Day.getDate() - 1
  // }

  // Month.DailySale = data.DailySale;
  // Month.Summary.GoalAtDay = Month.DailyGoal * Month.Summary.Day
  // Month.Summary.SelledAtDay= Math.trunc(Month.DailySale.map(venta => venta.Venta + (venta.Bonificacion / 1.19)).reduce((sum, num) => sum + num));


  
  // Month.save()
  // .then(() => res.status(200).send("Venta Actualizada Exitosamente"))
  // .catch(err => next(err))

  let data = req.body

  console.log(data)

  let Day = new Date()

  if(Day.getMonth() + 1 > parseInt(data.Month)){
    data.Summary.Day = new Date(data.Year, data.Month, 0).getDate()
  }else{
    data.Summary.Day = Day.getDate() - 1
  }

  
  data.Summary.GoalAtDay = data.DailyGoal * data.Summary.Day
  data.Summary.SelledAtDay= Math.trunc(data.DailySale.map(venta => venta.Venta + (venta.Bonificacion / 1.19)).reduce((sum, num) => sum + num));

  MonthControl.findByIdAndUpdate(data._id, data)
  .then(() => res.send("Venta Actualizada Exitosamente"))
  .catch(err => next(err))

  
};


const UpdateDay = (req, res, next) => {

  // let Month = await MonthControl.findById(req.params.id).exec();

  // let Day = new Date();

  // if(Day.getMonth() + 1 > parseInt(Month.Month)){
  //   Month.Summary.Day = new Date(Month.Year, Month.Month, 0).getDate()
  // }else{
  //   Month.Summary.Day = Day.getDate() - 1
  // }

  // Month.Summary.GoalAtDay = Month.DailyGoal * Month.Summary.Day

  // await Month.save();

  // res.status(200).json(Month)

  const { id } = req.params

  MonthControl.findById(id)
  .then(Month => {

    console.log(Month)

    let Day = new Date();
  
    if(Day.getMonth() + 1 > parseInt(Month.Month)){
      Month.Summary.Day = new Date(Month.Year, Month.Month, 0).getDate()
    }else{
      Month.Summary.Day = Day.getDate() - 1
    }
  
    Month.Summary.GoalAtDay = Month.DailyGoal * Month.Summary.Day
  
  
    Month.save()

  })
  .then(() => res.status(200).send("Actualizado"))
  .catch(err => next(err))


}


const DeleteMonth = async(req, res, next) => {
  try {
    const { id } = req.params
    let todelete = await MonthControl.findByIdAndDelete(id)
    console.log(todelete)
    if(todelete === null){
      res.status(404).json({ message : "ID no encontrada" })
    }

    res.status(204).end()
  }catch(err){
    next(err)
  }

  // MonthControl.findByIdAndRemove(req.params.id)
  // .then(result => res.status(204).json(result))
  // .catch(err => next(err))
}


module.exports = { GetMonths, GetMonth, CreateMonth, DailySale, UpdateDay, DeleteMonth } 