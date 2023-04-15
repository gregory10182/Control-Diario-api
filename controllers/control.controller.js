const monthRouter = require("express").Router();
const User = require("../models/user.model");
const MonthControl = require("../models/control.model.js");
const userExtractor = require("../middleware/userExtractor");
const month = require("../models/control.model.js");

monthRouter.get("/", userExtractor, (req, res, next) => {

  const { Uid } = req

  User.findById(Uid).populate("months")
  .then((result) => {
    res.json(result.months)
  })
  .catch(err => next(err))

});

monthRouter.get("/Month/:id", userExtractor, (req, res, next) => {

  const { id } = req.params;

  MonthControl.findById(id)
    .then((result) => {
      if (result) {
        res.json(result);
      } else {
        res.status(404).end();
      }
    })
    .catch(err => next(err));
});

// Agregando el campo de recargas en el dailySale de los meses ya creados
// monthRouter.put("/repair/", userExtractor, (req, res, next) => {
//   MonthControl.find({})
//   .then(result => {
//     result.forEach(month => {
//       return(month.DailySale.map(day => day.Recargas = 0))
//     })
//     res.json(result)
//   })

// })

monthRouter.post("/NewMonth/", userExtractor, (req, res, next) => {
  // try {

  // const { Uid } = req

  // const { Month, Year, Goal } = req.body;
  // let MonthDays = new Date(Year, Month, 0).getDate();
  // let DailyGoal = Math.trunc(Goal / MonthDays);
  // let DailySale = Array(MonthDays).fill({
  //   Venta: 0,
  //   Bonificacion: 0,
  // });
  // let mid = Month + "-" + Year;
  // let Day = 1;
  // let GoalAtDay = DailyGoal * (Day + 1);
  // let SelledAtDay = 0;
  // let Summary = {
  //   Day: Day,
  //   GoalAtDay: GoalAtDay,
  //   SelledAtDay: SelledAtDay,
  // };

  
  // const user = await User.findById(Uid);

  // const NewMonth = new MonthControl({
  //   mid,
  //   Month,
  //   Year,
  //   Goal,
  //   DailyGoal,
  //   DailySale,
  //   Summary,
  //   user: user._id,
  // });
  
  //   const savedMonth = await NewMonth.save();

  //   user.months = user.months.concat(savedMonth._id);

  //   await user.save();

  //   res.status(201).send("Mes Creado Exitosamente")
  // } catch (error) {
  //   next(error);
  // }

  const { Uid } = req

  const { Month, Year, Goal } = req.body;

  if(Month === undefined || Year === undefined){
    next({
      name: "ValidationError"
    })
  }
  
  let MonthDays = new Date(Year, Month, 0).getDate();
  let DailyGoal = Math.trunc(Goal / MonthDays);
  let DailySale = Array(MonthDays).fill({
    Venta: 0,
    Bonificacion: 0,
    Recargas: 0,
  });
  let mid = Month + "-" + Year;
  let Day = 1;
  let GoalAtDay = DailyGoal * (Day + 1);
  let SelledAtDay = 0;
  let Summary = {
    Day: Day,
    GoalAtDay: GoalAtDay,
    SelledAtDay: SelledAtDay,
  };

  let user

  User.findById(Uid)
  .then((foundUser) => {

    user = foundUser

    const newMonth = new MonthControl({
      mid,
      Month,
      Year,
      Goal,
      DailyGoal,
      DailySale,
      Summary,
      user: foundUser._id,
    });

    return newMonth.save()
  })
  .then((savedMonth) => {
    user.months = user.months.concat(savedMonth._id)
    
    return user.save()
  })
  .then(() => {
    res.status(201).send("Mes Creado Exitosamente")
  })
  .catch(err => next(err))

});

monthRouter.put("/DailySale/", userExtractor, (req, res, next) => {
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

  let data = req.body;

  let Day = new Date();

  if (Day.getMonth() + 1 > parseInt(data.Month)) {
    data.Summary.Day = new Date(data.Year, data.Month, 0).getDate();
  } else {
    data.Summary.Day = Day.getDate() - 1;
  }

  data.Summary.GoalAtDay = data.DailyGoal * data.Summary.Day;
  data.Summary.SelledAtDay = Math.trunc(
    data.DailySale.map(
      (venta) => venta.Venta + (venta.Bonificacion / 1.19) + venta.Recargas
    ).reduce((sum, num) => sum + num)
  );

  MonthControl.findByIdAndUpdate(data.id, data)
    .then(() => res.send("Venta Actualizada Exitosamente"))
    .catch((err) => next(err));
});

monthRouter.put("/UpdateDay/:id", userExtractor, (req, res, next) => {
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

  const { id } = req.params;

  MonthControl.findById(id)
    .then((Month) => {
      console.log(Month);

      let Day = new Date();

      if (Day.getMonth() + 1 > parseInt(Month.Month)) {
        Month.Summary.Day = new Date(Month.Year, Month.Month, 0).getDate();
      } else {
        Month.Summary.Day = Day.getDate() - 1;
      }

      Month.Summary.GoalAtDay = Month.DailyGoal * Month.Summary.Day;

      Month.save();
    })
    .then(() => res.status(200).send("Actualizado"))
    .catch((err) => next(err));
});

monthRouter.delete("/DeleteMonth/:id", userExtractor, (req, res, next) => {

  const { Uid } = req
  const { id } = req.params
  let user;

  User.findById(Uid)
  .then(foundUser => {
    user = foundUser;

    return MonthControl.findByIdAndRemove(id)
  })
  .then(removedMonth => {
    const index = user.months.indexOf(removedMonth._id)

    if(index > -1){
      user.months.splice(index, 1)
    }

    return user.save()
  })
  .then(() => {
    res.status(200).send("Mes Eliminado Correctamente")
  })
  .catch(err => next(err))
});

module.exports = monthRouter;
