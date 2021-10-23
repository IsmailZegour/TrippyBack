const mongoose = require('mongoose');

let messageSchema = new mongoose.Schema({

    _id_chat: {
        type: mongoose.Schema.Types.ObjectId, ref: 'chat'
    },

    sender: String,
    receiver: String,
    content: String,

});

module.exports = messageSchema;