//created for avoiding conflict between app.js server and test.js server

const app =require("./app")
const port = 3000;

app.listen(port,()=>{
    console.log("Server is listening in port : " + port)
})