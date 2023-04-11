const { Schema, model } = require('mongoose')
const uniqueValidator = require("mongoose-unique-validator")

const UserSchema = Schema({
    local: {type: String, required: true, unique: true},
    passwordHash: String,
    months: [{
        type: Schema.Types.ObjectId,
        ref: "MonthDev"
    }]
})

UserSchema.plugin(uniqueValidator)

UserSchema.set("toJSON", {
    transform: (document, returnedObject) =>{
        returnedObject.id = returnedObject._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

const User = model('UserDev', UserSchema)

module.exports = User