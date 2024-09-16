const mongoose = require('mongoose')

const machineSchema = mongoose.Schema({
    machineProducer: {
        required: true,
        type: String
    },
    machineName: {
        required: true,
        type: String
    },
    isRented: {
        required: true,
        type: Boolean,
        default: false
    },
    hourlyPrice: {
        required: true,
        type: Number,
        default: 10
    }
})

module.exports = mongoose.model("Machine", machineSchema)