const supertest = require("supertest")
const app = require("../index")

const api = supertest(app);

const initialMonths = [
    {
        "Summary": {
            "Day": 28,
            "GoalAtDay": 39676644,
            "SelledAtDay": 38538903
        },
        "_id": "2-2023",
        "Month": 2,
        "Year": 2023,
        "Goal": 39676651,
        "DailyGoal": 1417023,
        "DailySale": [
            {
                "Venta": 1510670,
                "Bonificacion": 137438
            },
            {
                "Venta": 2094102,
                "Bonificacion": 332349
            },
            {
                "Venta": 1281572,
                "Bonificacion": 178377
            },
            {
                "Venta": 934313,
                "Bonificacion": 9796
            },
            {
                "Venta": 675619,
                "Bonificacion": 158514
            },
            {
                "Venta": 1670838,
                "Bonificacion": 117910
            },
            {
                "Venta": 1112236,
                "Bonificacion": 316113
            },
            {
                "Venta": 1150160,
                "Bonificacion": 118813
            },
            {
                "Venta": 1804243,
                "Bonificacion": 0
            },
            {
                "Venta": 1173890,
                "Bonificacion": 0
            },
            {
                "Venta": 1265511,
                "Bonificacion": 0
            },
            {
                "Venta": 441785,
                "Bonificacion": 1126828
            },
            {
                "Venta": 1900246,
                "Bonificacion": 171278
            },
            {
                "Venta": 1063500,
                "Bonificacion": 203632
            },
            {
                "Venta": 402576,
                "Bonificacion": 0
            },
            {
                "Venta": 1358203,
                "Bonificacion": 0
            },
            {
                "Venta": 782545,
                "Bonificacion": 132835
            },
            {
                "Venta": 945083,
                "Bonificacion": 75855
            },
            {
                "Venta": 801926,
                "Bonificacion": 80984
            },
            {
                "Venta": 1666920,
                "Bonificacion": 409075
            },
            {
                "Venta": 1333784,
                "Bonificacion": 135810
            },
            {
                "Venta": 807635,
                "Bonificacion": 186843
            },
            {
                "Venta": 1496142,
                "Bonificacion": 316995
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 5825906,
                "Bonificacion": 1787558
            }
        ],
        "__v": 35
    },
    {
        "Summary": {
            "Day": 20,
            "GoalAtDay": 28476580,
            "SelledAtDay": 23558563
        },
        "_id": "3-2023",
        "Month": 3,
        "Year": 2023,
        "Goal": 44138720,
        "DailyGoal": 1423829,
        "DailySale": [
            {
                "Venta": 1011033,
                "Bonificacion": 486072
            },
            {
                "Venta": 1464368,
                "Bonificacion": 290492
            },
            {
                "Venta": 1241177,
                "Bonificacion": 139612
            },
            {
                "Venta": 1405973,
                "Bonificacion": 63064
            },
            {
                "Venta": 626328,
                "Bonificacion": 36097
            },
            {
                "Venta": 1663486,
                "Bonificacion": 263082
            },
            {
                "Venta": 1228256,
                "Bonificacion": 217654
            },
            {
                "Venta": 829971,
                "Bonificacion": 111172
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 5006559,
                "Bonificacion": 1058320
            },
            {
                "Venta": 1563477,
                "Bonificacion": 124631
            },
            {
                "Venta": 1142415,
                "Bonificacion": 217064
            },
            {
                "Venta": 876515,
                "Bonificacion": 205387
            },
            {
                "Venta": 2087494,
                "Bonificacion": 847052
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            },
            {
                "Venta": 0,
                "Bonificacion": 0
            }
        ],
        "__v": 15
    }
  ]

const getGoalFromMonths = async() => {
    const result = await api.get('/')
    
    return result.body.map(month => month.Goal)
}


module.exports =   { 
    initialMonths, 
    api,
    getGoalFromMonths
}