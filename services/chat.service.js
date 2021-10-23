const ChatRepository = require('../repositories/chat.repository');

const ChatService = {
    newMessage: async (sender_id, receiver_id, content, conversation_id) => {
        const message = await ChatRepository.newMessage(sender_id, receiver_id, content, conversation_id);
        return message;
    },
    getConversation: async (user1,user2) => {
        const conversation = await ChatRepository.getConversation(user1,user2);
        return conversation;
    },
    loadMessages: async(chat_id) => {
        const messages = await ChatRepository.loadMessages(chat_id);
        return messages;
    }

}

module.exports = ChatService;
