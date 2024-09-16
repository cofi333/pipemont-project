const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("../routes/users")
const machineRouter = require("../routes/machines")
const customerRouter = require("../routes/customers")
const { MONGODB_URI } = process.env;


const client = new MongoClient(MONGODB_URI, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
  });


const corsOptions = {
    origin: "http://pipemont-mobile-app.com"
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json())
app.use('/users', userRouter)
app.use('/machines', machineRouter)
app.use("/customers", customerRouter)

app.get("/", (req, res) => res.send("Express on Vercel"));
app.listen(3000, () => console.log("Server ready on port 3000."));


module.exports = app



