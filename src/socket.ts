import { Server, Socket } from "socket.io";
import knexConnection from "../knexConnection";
import { logger } from "./utils/logger";

function socket({ io }: { io: Server }) {
  logger.info('socket-enabled')

  function getConversationId(userId1: any, userId2: any) {
    const sortedIds = [userId1, userId2].sort();
    return `${sortedIds[0]}-${sortedIds[1]}`;
  }
  
  // Socket.IO
  io.on("connection", (socket) => {
    logger.info('connection established');
  
    // When a user joins a conversation
    socket.on("join conversation", async ({ senderId, receiverId }) => {
      const conversationId = getConversationId(senderId, receiverId);
      socket.join(conversationId);

      const messages = await knexConnection[process.env.NODE_ENV || 'local']("chat")
        .where("conversation_id", conversationId)
        .andWhere(function () {
          this.where("user_id", senderId).orWhere("user_id", receiverId);
        })
        .andWhere(function () {
          this.where("recommended_travelers_id", senderId).orWhere("recommended_travelers_id", receiverId);
        })
        .select("id", "user_id", "recommended_travelers_id", "message", "created_at");

      // Send the message history to the client
      socket.emit("message history", messages);
    });
  
    // When a user sends a message
    socket.on("send message", async (data) => {
      const { senderId, receiverId } = data;
      const conversationId = getConversationId(senderId, receiverId);
      data.conversation_id = conversationId;
  
      //const newMessage = await Message.query().insert(data);
      const res = await knexConnection[process.env.NODE_ENV || 'local']("chat").insert({
        conversation_id: conversationId,
        user_id: senderId,
        recommended_travelers_id: receiverId,
        message: data?.message || '',
      }).returning('*');
      console.log(res[0])
      io.to(conversationId).emit("receive message", res[0]);
      console.log('send message')
    });
  
    socket.on("disconnect", () => {
      console.log("a user disconnected");
    });
  });
}

export default socket;