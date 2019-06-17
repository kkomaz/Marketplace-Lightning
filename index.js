const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys.js')
require('./model/Item');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express()

require('./routes/ItemRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

const PORT = process.env.PORT || 5000;
app.listen((PORT), () => {
  console.log('listening on port ' + PORT);
});
