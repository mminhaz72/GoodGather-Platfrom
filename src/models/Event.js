import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    thumbnail: { type: String, default: "" },
    organizerEmail: { type: String, default: "" },
    creatorId: { type: String },
    participants: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.models.Event || mongoose.model("Event", EventSchema);