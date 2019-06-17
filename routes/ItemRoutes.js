const mongoose = require('mongoose');
const Item = mongoose.model('items');

module.exports = app => {
  app.post('/items', async (req, res) => {
    if (!req.body.description) {
      return res.status(400).send({
        message: 'Item content can not be empty'
      })
    }

    const item = new Item({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    })

    try {
      const data = await item.save()
      res.send(data)
    } catch (e) {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Item."
      });
    }
  })

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
