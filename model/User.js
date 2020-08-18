const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create the User Schema
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    birthdate: {
        type: Date,
        required: true
    },
    residence: {
        type: String,
        required: true
    },
    bloodgroup: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    donationDate: [{
        type: Date,
        required: false
    }]
});

module.exports = User = mongoose.model('users', UserSchema);