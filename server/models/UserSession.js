import mongoose from "mongoose";

const UserSession = new mongoose.Schema({
  userId: {
    type: String,
    default: ""
  },
  timestamp: {
    type: Date,
    default: Date.now()
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model("UserSession", UserSession);
