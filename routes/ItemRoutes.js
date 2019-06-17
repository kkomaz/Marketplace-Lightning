const mongoose = require('mongoose');
const Item = mongoose.model('items');

module.exports = app => {
  app.get('/items', async (req, res) => {
    try {
      const items = await Item.find()
      res.send(items)
    } catch (e) {
      res.status(500).send({
        message: e.message || "Some error occured while retrieving items"
      })
    }
  })
}
