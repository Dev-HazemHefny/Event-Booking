import mongoose from "mongoose";
const venueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String
  },
  city: {
    type: String
  },
  capacity: {
    type: Number,
    required: true
  },
});

const Venue = mongoose.model("Venue", venueSchema);
export default Venue;
