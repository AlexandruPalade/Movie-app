import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema({
  title: {
    type: String,
    unique: true
  },

  description: {
    type: String
  },

  genre: {
    type: String
  },

  tags: {
    type: [String]
  },

  length: {
    type: String
  },

  dateReleased: {
    type: Date
  },

  dateAvailableUntil: {
    type: Date
  },

  metadataInfo: {
    picture: {
      type: [String]
    },

    metaTitle: {
      type: String
    },

    metaDescription: {
      type: String
    }
  }
});

export const Movie = mongoose.model("Movie", movieSchema);
