const supertest = require("supertest")
const User = require('../models/user.model')
const month = require("../models/control.model")
const bcrypt = require('bcrypt')
const app = require("../index")

const api = supertest(app);

const initialMonths = [
    {
        "Summary": {
            "Day": 28,
            "GoalAtDay": 39676644,
            "SelledAtDay": 38538903
        },
        "mid": "2-2023",
        "Month": 2,
        "Year": 2023,
        "Goal": 39676651,
        "DailyGoal": 1417023,
        "DailySale": [
            {
                "Venta": 1510670,
                "Bonificacion": 137438,
                "Recargas": 0
            },
            {
                "Venta": 2094102,
                "Bonificacion": 332349,
                "Recargas": 0
            },
            {
                "Venta": 1281572,
                "Bonificacion": 178377,
                "Recargas": 0
            },
            {
                "Venta": 934313,
                "Bonificacion": 9796,
                "Recargas": 0
            },
            {
                "Venta": 675619,
                "Bonificacion": 158514,
                "Recargas": 0
            },
            {
                "Venta": 1670838,
                "Bonificacion": 117910,
                "Recargas": 0
            },
            {
                "Venta": 1112236,
                "Bonificacion": 316113,
                "Recargas": 0
            },
            {
                "Venta": 1150160,
                "Bonificacion": 118813,
                "Recargas": 0
            },
            {
                "Venta": 1804243,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 1173890,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 1265511,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 441785,
                "Bonificacion": 1126828,
                "Recargas": 0
            },
            {
                "Venta": 1900246,
                "Bonificacion": 171278,
                "Recargas": 0
            },
            {
                "Venta": 1063500,
                "Bonificacion": 203632,
                "Recargas": 0
            },
            {
                "Venta": 402576,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 1358203,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 782545,
                "Bonificacion": 132835,
                "Recargas": 0
            },
            {
                "Venta": 945083,
                "Bonificacion": 75855,
                "Recargas": 0
            },
            {
                "Venta": 801926,
                "Bonificacion": 80984,
                "Recargas": 0
            },
            {
                "Venta": 1666920,
                "Bonificacion": 409075,
                "Recargas": 0
            },
            {
                "Venta": 1333784,
                "Bonificacion": 135810,
                "Recargas": 0
            },
            {
                "Venta": 807635,
                "Bonificacion": 186843,
                "Recargas": 0
            },
            {
                "Venta": 1496142,
                "Bonificacion": 316995,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 5825906,
                "Bonificacion": 1787558,
                "Recargas": 0
            }
        ]
    },
    {
        "Summary": {
            "Day": 20,
            "GoalAtDay": 28476580,
            "SelledAtDay": 23558563
        },
        "mid": "3-2023",
        "Month": 3,
        "Year": 2023,
        "Goal": 44138720,
        "DailyGoal": 1423829,
        "DailySale": [
            {
                "Venta": 1011033,
                "Bonificacion": 486072,
                "Recargas": 0
            },
            {
                "Venta": 1464368,
                "Bonificacion": 290492,
                "Recargas": 0
            },
            {
                "Venta": 1241177,
                "Bonificacion": 139612,
                "Recargas": 0
            },
            {
                "Venta": 1405973,
                "Bonificacion": 63064,
                "Recargas": 0
            },
            {
                "Venta": 626328,
                "Bonificacion": 36097,
                "Recargas": 0
            },
            {
                "Venta": 1663486,
                "Bonificacion": 263082,
                "Recargas": 0
            },
            {
                "Venta": 1228256,
                "Bonificacion": 217654,
                "Recargas": 0
            },
            {
                "Venta": 829971,
                "Bonificacion": 111172,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 5006559,
                "Bonificacion": 1058320,
                "Recargas": 0
            },
            {
                "Venta": 1563477,
                "Bonificacion": 124631,
                "Recargas": 0
            },
            {
                "Venta": 1142415,
                "Bonificacion": 217064,
                "Recargas": 0
            },
            {
                "Venta": 876515,
                "Bonificacion": 205387,
                "Recargas": 0
            },
            {
                "Venta": 2087494,
                "Bonificacion": 847052,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0,
                "Recargas": 0
            }
        ]
    }
  ]



const initialUser = {
    local: "1010",
    password: "asdqwe"
}

let token



const Before = async() => {
    await User.deleteMany({})

    
    
    const passwordHash = await bcrypt.hash(initialUser.password, 10)

    const user = new User({
        local: initialUser.local,
        passwordHash
    })

    const savedUser = await user.save()

    initialMonths[0].user = savedUser._id
    initialMonths[1].user = savedUser._id

    await month.deleteMany({})

    const month1 = new month(initialMonths[0])
    await month1.save()
    const month2 = new month(initialMonths[1])
    await month2.save()

    user.months = user.months.concat(month1._id)
    user.months = user.months.concat(month2._id)

    await user.save()

    token = await getToken()


}

const getToken = async() => {
    const user = await api
    .post('/login')
    .send({
        local: initialUser.local,
        password: initialUser.password
    })



    return user.body.token
}

const getGoalFromMonths = async() => {
    const result = await api
    .get('/')
    .set('Authorization', 'Bearer ' + token)
    
     

    return(result.body.map(month => month.Goal))
}

const getAllMonths = async() => { 
    const result = await api
    .get('/')
    .set('Authorization', 'Bearer ' + token)

    return(result)
}


module.exports =   { 
    initialMonths,
    initialUser,
    api,
    getGoalFromMonths,
    getAllMonths,
    Before,
    getToken
}