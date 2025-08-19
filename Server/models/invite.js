import mongoose from "mongoose";

const InviteSchema = new mongoose.Schema(
  {
    inviteId: { type: String, unique: true, index: true },
    answer: { type: String, enum: ["Yes", "No", ""], default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Invite", InviteSchema);
