const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js')

mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express()

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

app.listen(5000);
