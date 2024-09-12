const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/users")
const machineRouter = require("./routes/machines")


const corsOptions = {
    origin: "http://pipemont-mobile-app.com"
}

const app = express()
app.use(cors(corsOptions))

mongoose.connect("mongodb://localhost/pipemont")

const db = mongoose.connection

db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to db"))

app.use(express.json())
app.use('/users', userRouter)
app.use('/machines', machineRouter)


app.listen(4000, () => console.log("hello server"))


