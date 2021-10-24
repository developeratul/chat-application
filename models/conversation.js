const mongoose = require("mongoose");

const dataSchema = new mongoose.Schema(
  {
    creator: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    participant: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    last_updated: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

const Conversation = new mongoose.model("Conversation", dataSchema);

module.exports = Conversation;
