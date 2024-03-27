const mongoose = require("mongoose")
const request = require("supertest")

const app = require("../app")
const helper = require("../helpers/user.helper")


require("dotenv").config()

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
        .then(
            () => {
                console.log("Connection to MongoDB established")
            },
            err => {
                console.log("Failed to connect to MongoDB", err)
            }
        )
})

afterEach(async () => {
    await mongoose.connection.close()
})

describe("Request GET /api/users", () => {
    it('should return all users', async () => {
        const res = await request(app).get("/api/users")
        expect(res.statusCode).toBe(200)
        expect(res.body.data.length).toBeGreaterThan(0)


    }, 2000);

})

describe("Request Get /api/users/:username", ()=>{

    it('should Return a user', async () => {
        const result = await helper.findLastInsertedUser()
        console.log(result)


        const res = await request(app).get("/api/users/" + result.username)
        expect(res.statusCode).toBe(200)
        expect(res.body.data.username).toBe(result.username)
        expect(res.body.data.email).toBe(result.email)

    },2000);

})

describe("request POST /api/users", ()=>{
    it('should Creates a user  ',async () => {
        const res = await request(app)
            .post("/api/users")
            .send({
                username: "test1",
                password:"123456",
                name:"Kostas",
                surname:"Kostakis",
                email:"test@aueb.gr"
            })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    },10000);
})

describe("request POST /api/users", ()=>{
    it('should Creates a user testing password  ', async () => {
        const res = await request(app)
            .post("/api/users")
            .send({
                username: "test1",
                password:"123",
                name:"Kostas",
                surname:"Kostakis",
                email:"test@aueb.gr"
            })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    },10000);
})

describe("request POST /api/users", ()=>{
    it('should creates a user testing username and password  ', async () => {
        const res = await request(app)
            .post("/api/users")
            .send({
                username: "test1",
                password:"123456",
                name:"Kostas",
                surname:"Kostakis",
                email:"test@aueb.gr"
            })
        expect(res.statusCode).toBe(400)
        expect(res.body.data).toBeTruthy()
    },10000);
})

describe("DELETE /api/users/:username", ()=>{
    it('should Delete last inserted user', async () => {
        const result = await helper.findLastInsertedUser()
        const res = await request(app)
            .delete("/api/users" + result.username)

    expect(res.statusCode).toBe(200)
    },10000);
})