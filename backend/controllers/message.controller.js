import { Conversation } from "../models/conversation.model.js";
import { Message } from "../models/message.model.js";

const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const {message} = req.body;

        let gotConversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]},
        })

        if(!gotConversation){
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId],
            })
        }

        const newMessage = await Message.create({
            senderId,
            receiverId,
            message,
        })

        if(newMessage){
            gotConversation.messages.push(newMessage._id);
        }
        await gotConversation.save();

        return res.status(201).json({
            message: "Message sent successfully",
            success: true
        })
    } catch (error) {
        console.log(error);
        
    }
}

const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;

        const conversation = await Conversation.findOne({
            participants: {$all : [senderId, receiverId]},
        }).populate("messages");


        // console.log(conversation);
        return res.status(201).json({
            message: "Message received successfully!!",
            success: true
        })
        
    } catch (error) {
        console.log(error);
        
    }
}

export {sendMessage, getMessage}