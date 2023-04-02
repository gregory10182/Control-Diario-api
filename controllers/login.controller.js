const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user.model')


loginRouter.post('/login', async(req, res) => {
    const { body } = req
    const { local, password } = body

    const user = await User.findOne({ local })
    const passwordCorrect = user === null 
    ? false
    : await bcrypt.compare(password, user.passwordHash)

    if(!(user && passwordCorrect)){
        res.status(401).json({
            error: 'invalid user or password'
        })
    }

    const userForToken = {
        id: user._id,
        local: user.local
    }

    const token = jwt.sign(userForToken, process.env.SECRET)

    res.status(200).json({
        token: token,
        local: user.local
    })
})


module.exports = loginRouter