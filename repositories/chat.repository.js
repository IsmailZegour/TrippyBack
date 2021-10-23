const db = require("../models");
const User = db.user;
const Chat = db.chat;
const Message = db.message;

const ChatRepository = {
    newMessage: async (sender_id, receiver_id, content, conversation_id) => {
        let message = new Message({
            sender: sender_id,
            receiver: receiver_id,
            content: content,
            _id_conversation: conversation_id,
        });
        message.save();

        return message;
    },
    getConversation: async (user1,user2) => {
        let chat = await Chat.find({$or: [{user1:user1, user2:user2},{user2:user1, user1:user2}]});
        if(chat.length==0){
            chat = new Chat({
                user1:user1,
                user2:user2,
            })
            await chat.save();
        }
        console.log(chat);
        return chat;
    },
    loadMessages: async (chat_id) => {
        let messages = await Messages.find({_id_chat:chat_id});
        return messages;
    }
}

module.exports = ChatRepository;