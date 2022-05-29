const mongoose = require("mongoose");

const { Schema } = mongoose;

const emailSchema = new Schema({
    content: {type: String},
    image: {type: String},
    senderId:{},
    receiverId:{},
}, {
    timestamps:true
});

module.exports = mongoose.model('email', emailSchema);
