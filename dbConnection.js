

import mongoose from "mongoose";

export const dbConnection = mongoose.connect("mongodb+srv://hefnyhazem531_db_user:Hazem1234@cluster0.lg7yltk.mongodb.net/?retryWrites=true&w=majority&appName=EventBooking")
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));