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

usersRouter.post("/CreateUser", async (req, res) => {
  const { body } = req;
  const { local, password } = body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    local,
    passwordHash,
  });

  const saverUser = await user.save();

  res.status(201).json(saverUser);
});

module.exports = usersRouter;
