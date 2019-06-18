const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const keys = require('./config/keys.js')
require('./model/Project');
require('./model/Contribution');
mongoose.connect(keys.mongoURI, { useNewUrlParser: true });

const app = express()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

const whitelist = []
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
require('./routes/ContributionRoutes')(app);

if (process.env.NODE_ENV === 'production') {
  console.log('running production');
  /**
   * Express will serve up production assets.  Like our main.js file, or main.css file!
   * If a route handler is not set up, look into client/build and see if matches up with whatever the request is asking for.
  */
  app.use(express.static('client/build'));

  /**
   * Express will serve up the index.html file if it doesn't recognize the route
   * Serve the HTML document.  Absolute catch-all.
  */
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen((PORT), () => {
  console.log('listening on port ' + PORT);
});
