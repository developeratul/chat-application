const Conversation = require("../models/conversation");
const Message = require("../models/message");

module.exports = {
  getInbox: async function (req, res, next) {
    try {
      const conversations = await Conversation.find({
        $or: [{ "creator.id": req.user._id }, { "participant.id": req.user._id }],
      }).sort({ updatedAt: -1 });
      res.locals.data = conversations;
      res.render("inbox");
    } catch (err) {
      next(err);
    }
  },

  getConversationsInJSONformat: async function (req, res, next) {
    try {
      const conversations = await Conversation.find({
        $or: [{ "creator.id": req.user._id }, { "participant.id": req.user._id }],
      }).sort({ updatedAt: -1 });

      res.send(conversations);
    } catch (err) {
      next(err);
    }
  },

  createConversation: async function (req, res) {
    try {
      const newConversation = new Conversation({
        creator: {
          id: req.user._id,
          name: req.user.name,
          avatar: req.user.avatar || null,
        },
        participant: {
          id: req.body.id,
          name: req.body.participant,
          avatar: req.body.avatar || null,
        },
      });

      await newConversation.save();

      res.status(201).json({
        message: "Conversation was added successfully!",
      });
    } catch (err) {
      res.status(500).json({
        errors: {
          common: {
            msg: err.message,
          },
        },
      });
    }
  },

  getMessages: async function (req, res) {
    try {
      const messages = await Message.find({ conversationId: req.params.conversationId }).sort("-createdAt");
      const { participant, creator } = await Conversation.findById(req.params.conversationId);

      res.status(201).json({
        data: { messages, participant, creator },
        user: req.user._id,
        conversation_id: req.params.conversationId,
      });
    } catch (err) {
      res.status(500).json({
        errors: { common: { msg: err.message || "Unknown error occurred" } },
      });
    }
  },
};
