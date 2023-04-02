const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    local: String,
    passwordHash: String,
    months: [{
        type: Schema.Types.ObjectId,
        ref: "MonthDev"
    }]
})

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