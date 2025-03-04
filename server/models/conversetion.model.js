import mongoose from "mongoose";

const conversetionSchema = new mongoose.Schema(
  {
    participations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
        default: [],
      },
    ],
  },
  { timestamps: true }
);

const Conversetion = mongoose.model("Conversetion", conversetionSchema);

export default Conversetion;
