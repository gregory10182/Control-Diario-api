const mongoose = require("mongoose");

const month = require("../models/control.model")
const { initialMonths, initialUser, api, getGoalFromMonths, getAllMonths, Before, getToken} = require("./helpers")


let token


beforeEach(async () => { 
  await Before();
  
  token = await getToken()

  
})



describe("Testing '/' route", () => {
  

  test("should be running", async() => {

    await api
    .get("/")
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .expect("content-type", /application\/json/)
  });

  test("There are two months", async () => {

    const result = await api
    .get("/")
    .set('Authorization', 'Bearer ' + token)
    
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
    .set('Authorization', 'Bearer ' + token)
    .send(newMonth)
    .expect(201)
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
    .set('Authorization', 'Bearer ' + token)
    .send(newMonth)
    .expect(409)

    const result = await getAllMonths()

    expect(result.body).toHaveLength(initialMonths.length)
  })

  test("a month without month cant be added", async () => {
    const newMonth = {
      Year : 2023,
      Goal : 40000000	
    }


    await api
    .post('/NewMonth')
    .set('Authorization', 'Bearer ' + token)
    .send(newMonth)
    .expect(409)

    const result = await getAllMonths()

    expect(result.body).toHaveLength(initialMonths.length)
  })

  test("a month without year cant be added", async () => {
    const newMonth = {
      Month : 4,
      Goal : 40000000	
    }


    await api
    .post('/NewMonth')
    .set('Authorization', 'Bearer ' + token)
    .send(newMonth)
    .expect(409)

    const result = await getAllMonths()

    expect(result.body).toHaveLength(initialMonths.length)
  })
})



describe("testing '/DeleteMonth' route", () => {

  test('Delete a month with a valid id', async() => {

    const monthsBefore = await getAllMonths()

    await api
    .delete('/DeleteMonth/' + monthsBefore.body[0].id)
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .expect("Content-Type", /text\/html/)

    const monthsAfter = await getAllMonths()

    expect(monthsAfter.body).toHaveLength(monthsBefore.body.length - 1)
    
  })

  test('cant Delete a month without a valid id', async() => {
    await api
    .delete('/DeleteMonth/' + '10-2023')
    .set('Authorization', 'Bearer ' + token)
    .expect(404)
    .expect("Content-Type", /application\/json/)
  
    const result = await getAllMonths()
  
    expect(result.body).toHaveLength(initialMonths.length)
    
  })

  test('deleting the rigth month', async() => {

    const monthsBefore = await getAllMonths()

    await api
    .delete('/DeleteMonth/' + monthsBefore.body[0].id)
    .set('Authorization', 'Bearer ' + token)
    .expect(200)
    .expect("Content-Type", /text\/html/)
  
    const monthsAfter = await getAllMonths()

    const ids = monthsAfter.body.map(month => month.id)
  
    expect(ids).not.toContain(monthsBefore.body[0].id)
    
  })
})






afterAll(() => {
  mongoose.connection.close();
});
