const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/users");
const machineRouter = require("./routes/machines");
const customerRouter = require("./routes/customers");
const { MONGODB_URI } = process.env;

const corsOptions = {
    origin: "http://pipemont-mobile-app.com"
};

const app = express();
app.use(cors(corsOptions));
app.use(express.json());
app.use('/users', userRouter);
app.use('/machines', machineRouter);
app.use('/customers', customerRouter);

// // Connect to MongoDB using Mongoose
// async function connectDB() {
//     try {
//         await mongoose.connect(MONGODB_URI)
//         console.log("Successfully connected to MongoDB");
//     } catch (error) {
//         console.error("Error connecting to MongoDB:", error);
//     }
// }

// connectDB();

mongoose.connect("mongodb://localhost/pipemont")

const db = mongoose.connection

db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to db"))



app.listen(4000, () => console.log("hello server"))

module.exports = app;
