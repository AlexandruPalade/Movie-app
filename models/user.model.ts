import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g, "Email invalid"]
  },

  phoneNumber: {
    type: String,
    require: true,
    match: [
      /^(?:\+40|0040)?[1-9]\d{8}$/,
      "Phone number must have forma +40 or 0040 "
    ]
  },

  favoritesMovies: {
    type: [String]
  },

  preferences: {
    favoriteCategories: {
      type: [String]
    },
    websiteTheme: {
      type: String,
      enum: ["white", "dark"],
      default: "white"
    }
  }
});

export const User = mongoose.model("User", userSchema);
