
import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: {type:String},
  image:{type: String},
  date: {type:Date},
  start_time: {type: String},
  end_time: {type: String},
  price: { type: Number, default: 0 },
  total_tickets: { type: Number, default: 0 },
  available_tickets: { type: Number, default: 0 },
  status: { 
    type: String, 
    enum: ["upcoming", "ongoing", "completed", "cancelled"], 
    default: "upcoming" 
  },
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
  venue: { type: mongoose.Schema.Types.ObjectId, ref: "Venue" },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
}, { timestamps: true });

const Event =  mongoose.model("Event", eventSchema);
export default Event;