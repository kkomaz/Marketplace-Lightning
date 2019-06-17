const mongoose = require('mongoose')
const { Schema } = mongoose

const contributionSchema = new Schema({
  amount: Number,
  project_id: String,
  name: String,
  paid: {
    type: Boolean,
    default: false,
  }
})

mongoose.model('contributions', contributionSchema)
