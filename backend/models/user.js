const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true
    },
    registrationToken: {
        type: String,
        required: false,
    },
    registrationExpires: {
        type: Date,
        required: false,
    },
    forgottenPasswordToken: {
        type: String,
        required:false
    },
    forgottenPasswordExpires: {
        type: Date,
        required:false,
    },
    dateCreated: {
        type: Date,
        required: true,
        default: Date.now()
    },
    isActive: {
        type: Boolean,
        required: true,
        default: false
    }

})

module.exports = mongoose.model("User", userSchema)