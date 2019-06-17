const mongoose = require('mongoose')
const { Schema } = mongoose

const itemSchema = new Schema({
  name: String,
  price: String,
  description: String,
})

mongoose.model('items', itemSchema)
