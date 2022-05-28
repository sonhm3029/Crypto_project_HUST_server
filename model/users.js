const mongoose = require("mongoose");

const { Schema } = mongoose;

const usersSchema = new Schema({
    name: {type: String},
    email: {type: String, unique:true},
    password: {type: String},
}, {
    timestamps:true
});

module.exports = mongoose.model('user', usersSchema);
