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
    role: {
     type: String,
     default: 'basic',
     required: false,
     enum: ["basic", "admin"]
    },
    birthdate: {
        type: Date,
        required: true
    },
    residence: [{
        type: String,
        required: true
    }],
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
        required: true
    }],
    avaliable: {
        type: String,
        required: false,
        default: 'avaliable',
    },
});

module.exports = User = mongoose.model('users', UserSchema);