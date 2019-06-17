const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js')
require('./model/Project');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

const whitelist = ['http://example1.com', 'http://example2.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

if (process.env.NODE_ENV === 'production') {
  app.use(cors(corsOptions))
} else {
  app.use(cors())
}


require('./routes/ProjectRoutes')(app);

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

const PORT = process.env.PORT || 5000;
app.listen((PORT), () => {
  console.log('listening on port ' + PORT);
});
