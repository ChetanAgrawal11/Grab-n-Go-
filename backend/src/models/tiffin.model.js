import mongoose from "mongoose";

const dailyStatusSchema = new mongoose.Schema({
  date: Date,
  eaten: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["pending", "accepted", "rejected"],
    default: "pending",
  },
});

const tiffinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }, // optional
  status: { type: String, default: "Inactive" }, // optional

  area: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  providesMonthlyMess: { type: Boolean, default: false },

  weeklyPlan: {
    monday: String,
    tuesday: String,
    wednesday: String,
    thursday: String,
    friday: String,
    saturday: String,
    sunday: String,
  },

  messStartDate: Date, // When owner starts mess
  requestStartDate: Date, // When user requests to start mess
  messApproved: { type: Boolean, default: false },

  userStatus: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      dailyStatus: [dailyStatusSchema],
    },
  ],

  // Example snippet from Tiffin schema (add this if not already)
  requests: [
    {
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
        default: "pending",
      },
      requestedAt: { type: Date, default: Date.now },
      approvedAt: Date,
    },
  ],
});

const Tiffin = mongoose.model("Tiffin", tiffinSchema);
export default Tiffin;
