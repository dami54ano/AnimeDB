const mongoose = require("mongoose");

const AnimeSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  genre: {
    type: [String],
    required: [true, 'Please add at least one genre'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Please add at least one genre'
    }
  },
  episodes: {
    type: Number,
    required: [true, 'Please add number of episodes'],
    min: [1, 'Episodes must be at least 1']
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: [0, 'Rating must be at least 0'],
    max: [10, 'Rating cannot be more than 10']
  },
  characters: {
    type: [String],
    required: [true, 'Please add at least one character'],
    validate: {
      validator: function(v) {
        return v.length > 0;
      },
      message: 'Please add at least one character'
    }
  },
  studio: {
    type: String,
    required: [true, 'Please add a studio'],
    trim: true
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add an image URL'],
    match: [
      /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
      'Please use a valid URL with HTTP or HTTPS'
    ]
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  status: {
    type: String,
    enum: ['ongoing', 'completed', 'upcoming'],
    default: 'completed'
  },
  releaseYear: {
    type: Number,
    required: [true, 'Please add a release year'],
    min: [1900, 'Release year must be after 1900'],
    max: [new Date().getFullYear(), 'Release year cannot be in the future']
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

// Update the updatedAt field before saving
AnimeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("Anime", AnimeSchema); 