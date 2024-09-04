import mongoose, { Schema } from "mongoose";

const CounterSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  value: {
    type: Number,
    default: 0,
  },
});

export const Counter = mongoose.model("Counter", CounterSchema);
