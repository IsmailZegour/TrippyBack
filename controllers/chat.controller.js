const ChatService = require('../services/chat.service');

const ChatController = {
    newMessage: async (req,resp,next) => {
        const sender_id = req.user.id;
        const receiver_id = req.body.receiver_id;
        const content = req.body.message;
        const conversation_id = req.body.conversation_id;
        const message = await ChatService.newMessage(sender_id, receiver_id, content, conversation_id);
        resp.send(message);
    },
    getConversation: async(req,resp,next) => {
        const user1= req.user.id;
        const user2= req.params.id;
        const conversation = await ChatService.getConversation(user1, user2);
        resp.send({conversation:conversation,user:req.user});
    },
    loadMessages: async (req,resp,next) => {
        const chat_id = req.params.id;
        const messages = await ChatService.loadMessages(chat_id);
        resp.send(messages);
    }
    

}
module.exports = ChatController;