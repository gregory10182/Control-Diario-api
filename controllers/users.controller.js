const usersRouter = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcrypt");

usersRouter.get("/Users", async (req, res) => {
  try {
    const users = await User.find({}).populate("months");

    res.json(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/CreateUser", (req, res, next) => {
  const { body } = req;
  const { local, password } = body;

  const saltRounds = 10;
  
  bcrypt.hash(password, saltRounds)
  .then((passwordHash) => {

    const user = new User({
      local,
      passwordHash
    });

   return user.save()
  })
  .then((savedUser) => {
    res.status(201).json(savedUser);
  }).catch((err) => {
    next(err)
  });

});

module.exports = usersRouter;
