const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user.model')


loginRouter.post('/login', (req, res, next) => {
    const { body } = req
    const { local, password } = body

    let user;

    User.findOne({ local })
    .then((foundUser) => {
        user = foundUser 
        
        if(user === null){
          return false
        }else{
          return bcrypt.compare(password, user.passwordHash)
        }
    })
    .then((passwordCorrect) => {
      if(!(user && passwordCorrect)){
        res.status(401).json({
          error: 'invalid user or password'
        })
      }

      const userForToken = {
        id: user._id,
        local: user.local
      }

      return jwt.sign(userForToken, process.env.SECRET)
    })
    .then((result) => {
      res.status(200).json({
        token: result,
        local: user.local
      })
    })
    .catch(err => next(err))

    // const user = await User.findOne({ local })
    // const passwordCorrect = user === null 
    // ? false
    // : await bcrypt.compare(password, user.passwordHash)

    // if(!(user && passwordCorrect)){
    //     res.status(401).json({
    //         error: 'invalid user or password'
    //     })
    // }

    // const userForToken = {
    //     id: user._id,
    //     local: user.local
    // }

    // const token = jwt.sign(userForToken, process.env.SECRET)

    // res.status(200).json({
    //     token: token,
    //     local: user.local
    // })
})


module.exports = loginRouter