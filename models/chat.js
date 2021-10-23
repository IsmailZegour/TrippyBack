const mongoose = require('mongoose');

let chatSchema = new mongoose.Schema({
    user1: String,
    user2: String,
    
});


module.exports = chatSchema;