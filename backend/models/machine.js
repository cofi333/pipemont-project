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
    }
})

module.exports = mongoose.model("Machine", machineSchema)