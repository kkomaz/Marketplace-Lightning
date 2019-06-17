const express = require('express');
const monoose = require('mongoose');

mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds139037.mlab.com:39037/open-node-test');

const app = express()

app.get('/', (req, res) => {
  res.send({ hi: 'there' })
})

app.listen(5000);
