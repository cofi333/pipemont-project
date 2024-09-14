const mongoose = require('mongoose')

const customerSchema = mongoose.Schema({
    machineId: {
        required: true,
        type: String
    },
    customerName: {
        required: true,
        type: String
    },
    customerAddress: {
        required: true,
        type: String,
        default: false
    },
    customerPhoneNumber: {
        required: true,
        type: String
    }
   
})

module.exports = mongoose.model("Customer", customerSchema)