const mongoose = require("mongoose");

const month = require("../models/control.model")
const { initialMonths, api, getGoalFromMonths } = require("./helpers")





beforeEach(async () => { 
  await Before();
})



describe("Testing '/' route", () => {

  test("should be running", async () => {
    await api
    .get("/")
    .expect(200)
    .expect("content-type", /application\/json/)
  });

  test("There are two months", async () => {
    const result = await api.get("/")
    
    expect(result.body).toHaveLength(initialMonths.length)
  });
  
  test("the first month goal is the correct", async () => {

    const goals = await getGoalFromMonths()
    expect(goals).toContain(initialMonths[0].Goal)
  });
})


describe("testing '/NewMonth' route", () => {

  test("a valid month can be added", async () => {
    const newMonth = {
      Month : 4,
      Year : 2023,
      Goal : 40000000	
    }


    await api
    .post('/NewMonth')
    .send(newMonth)
    .expect(200)
    .expect('Content-Type', /text\/html/)

    const goals = await getGoalFromMonths()

    expect(goals).toContain(newMonth.Goal)
  })


  test("a month without Goal cant be added", async () => {
    const newMonth = {
      Month : 4,
      Year : 2023
    }


    await api
    .post('/NewMonth')
    .send(newMonth)
    .expect(400)

    const result = await api.get('/')

    expect(result.body).toHaveLength(initialMonths.length)
  })

  test("a month without month cant be added", async () => {
    const newMonth = {
      Year : 2023,
      Goal : 40000000	
    }


    await api
    .post('/NewMonth')
    .send(newMonth)
    .expect(400)

    const result = await api.get('/')

    expect(result.body).toHaveLength(initialMonths.length)
  })

  test("a month without year cant be added", async () => {
    const newMonth = {
      Month : 4,
      Goal : 40000000	
    }


    await api
    .post('/NewMonth')
    .send(newMonth)
    .expect(400)

    const result = await api.get('/')

    expect(result.body).toHaveLength(initialMonths.length)
  })
})



describe("testing '/DeleteMonth' route", () => {

  test('Delete a month with a valid id', async() => {
    await api
    .delete('/DeleteMonth/' + initialMonths[0]._id)
    .expect(204)

    const result = await api.get('/')

    expect(result.body).toHaveLength(initialMonths.length - 1)
    
  })

  test('cant Delete a month without a valid id', async() => {
    await api
    .delete('/DeleteMonth/' + '10-2023')
    .expect(404)
    .expect("Content-Type", /application\/json/)
  
    const result = await api.get('/')
  
    expect(result.body).toHaveLength(initialMonths.length)
    
  })

  test('deleting the rigth month', async() => {
    await api
    .delete('/DeleteMonth/' + initialMonths[0]._id)
    .expect(204)
  
    const result = await api.get('/')

    const ids = result.body.map(month => month._id)
  
    expect(ids).not.toContain(initialMonths[0]._id)
    
  })
})






afterAll(() => {
  mongoose.connection.close();
});
