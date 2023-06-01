import mongoose from "mongoose";

// Схема користувача
const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: String,
  events: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
});

const User = mongoose.model("User", userSchema);

export default User;
