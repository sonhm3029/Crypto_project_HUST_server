const mongoose = require("mongoose");

const { Schema } = mongoose;

const emailSchema = new Schema({
    content: {type: String},
    title:{type:String},
    image: {type: String},
    senderId:{type:mongoose.Types.ObjectId},
    receiverId:{type:mongoose.Types.ObjectId},
}, {
    timestamps:true
});

module.exports = mongoose.model('email', emailSchema);
