const { MongoClient, ServerApiVersion } = require('mongodb');
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const userRouter = require("./routes/users")
const machineRouter = require("./routes/machines")
const customerRouter = require("./routes/customers")
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

async function run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await client.connect();
      // Send a ping to confirm a successful connection
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);






