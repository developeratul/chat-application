const mongoose = require("mongoose");

const dataSchema = mongoose.Schema(
  {
    text: { type: String },
    attachment: [],
    sender: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    receiver: {
      id: mongoose.Types.ObjectId,
      name: String,
      avatar: String,
    },
    date_time: {
      type: Date,
      default: Date.now,
    },
    conversation_id: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", dataSchema);

module.exports = Message;
