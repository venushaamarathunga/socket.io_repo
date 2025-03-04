import Conversetion from "../models/conversetion.model.js";
import Message from "../models/message.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receverId } = req.params;
    const senderId = req.user._id;

    let conversetion = await Conversetion.findOne({
      participations: { $all: [senderId, receverId] },
    });

    if (!conversetion) {
      conversetion = await Conversetion.create({
        participations: [senderId, receverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receverId,
      message,
    });

    if (!newMessage) {
      conversetion.messages.push(newMessage._id);
    }

    await Promise.all([conversetion.save(), newMessage.save()]);

    res.status(200).json({ newMessage });
  } catch (error) {
    console.log("Error in send message controller : ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    let conversetion = await Conversetion.findOne({
      participations: { $all: [senderId, userToChatId] },
    }).populate("messages");

    if (!conversetion) return res.status(200).json([]);

    const messages = conversetion.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in get message controller : ", error);
    res.status(500).json({ error: "Internal server error." });
  }
};
