const mongoose = require('mongoose')
const { Schema } = mongoose

const projectSchema = new Schema({
  title: String,
  description: String,
  goal: Number,
})

mongoose.model('projects', projectSchema)
