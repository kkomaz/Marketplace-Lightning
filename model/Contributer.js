const mongoose = require('mongoose')
const { Schema } = mongoose

const contributorSchema = new Schema({
  amount: Number,
  item_id: String,
  name: String,
  paid: {
    type: Boolean,
    default: false,
  }
})
