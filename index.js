const express = require("express")
const morgan = require("morgan")
const path = require("path")
const PORT = 3000;
const apiRouter = require("./api")
require("dotenv").config()



const app = express()

app.use(morgan("dev"))

app.use(express.json())
app.use(express.urlencoded({ extended: false}))



app.use((req,res,next) => {
    console.log("BodyLogStart")
    console.log(req.body)
    console.log("BodyLogEnd")
    next()
})

app.use("/api",apiRouter)

app.use("/api", (req, res, next) => {
    console.log("request was sent to api")
    next()
})

app.get("/api", (req,res,next) => {
    console.log("a request was made to API")
    res.send({ message : "success"})
})

const {client } = require("./db")



app.listen(PORT, () => {
    console.log("The server is up on", PORT)
  })