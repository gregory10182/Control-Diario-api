const { api, Before } = require('./helpers')
const User = require('../models/user.model')
const mongoose = require('mongoose')

describe("Creating a new user", () => {
    // beforeEach(async () => {
    //     await Before();
    // })

    test('Works as expected creating a fresh username', async () => { 
        const usersDB = await User.find({})
        const usersAtStart = usersDB.map(user => user.toJSON())

        const newUser = {
            local: '1020',
            password: '123456789'
        }

        await api
        .post('/CreateUser')
        .send(newUser)
        .expect(201)
        .expect("Content-Type", /application\/json/)

        const usersDBAfter = await User.find({})
        const usersAtEnd = usersDBAfter.map(user => user.toJSON())

        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)


        const locals = usersAtEnd.map(l => l.local)

        expect(locals).toContain(newUser.local)
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})