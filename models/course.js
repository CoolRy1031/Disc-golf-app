import mongoose from "mongoose";

const Schema = mongoose.Schema

const reviewSchema = new Schema ({
  content: String,
  rating: { type: Number, min: 1, max: 10, default: 1}
})

const scoreSchema = new Schema ({
  score: Number,
})

const courseSchema = new Schema ({
  name: { type: String, required: true},
  holes: { type: Number, enum: [9,18]},
  par: Number,
  strokes: [scoreSchema],
  reviews: [reviewSchema],
} , {
  timestamps: true
})

const Course = mongoose.model('Course', courseSchema)

export {
  Course
}