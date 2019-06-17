const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema({
  title: String,
  description: String,
  goal: Number,
})

mongoose.model('items', itemSchema)
