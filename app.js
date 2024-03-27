const express = require("express")
const app = express()
//const port = 3000

const mongoose = require("mongoose")
app.use(express.json())
require("dotenv").config()
const swaggerUI = require("swagger-ui-express")
const swaggerDocument = require("./swagger")

mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {
            console.log("Connection to mongodb established")
        }, err => {
            console.log("Failed to connect to mongodb", err)
        }
    )
const cors = require("cors")
app.use(cors({
    //origin:["http://localhost:8000","http://www.aueb.gr"]
    origin:"*"
}))


const user =  require("./routes/user.route")
const userProduct = require("./routes/user.products.route")
app.use("/api/users", user)
app.use("/api/user-products", userProduct)
app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerDocument.options))
app.use("/",express.static("files"))

// app.listen(port, () => {
//     console.log("Server is listening in port : " + port)
//
// })

module.exports = app

