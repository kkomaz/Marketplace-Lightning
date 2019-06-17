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
        message: e.message || "Some error occurred while creating the Item."
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

  app.get('/items/:itemId', async (req, res) => {
    try {
      const item = await Item.findById(req.params.itemId)
      if (!item) {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId
        })
      }
      res.send(item)
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Item not found with id " + req.params.itemId
        });
      }

      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.itemId
      });
    }
  })

  app.put('/items/:itemId', async (req, res) => {
    if (!req.body.description) {
      return res.status(400).send({
        message: 'Item content can not be empty'
      })
    }

    try {
      const item = await Item.findByIdAndUpdate(req.params.itemId, {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
      }, { new: true })

      if (!item) {
        return res.status(404).send({
          message: 'Item not found with id ' + req.params.itemId
        })
      }

      res.send(item)
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Item not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error updating Item with id " + req.params.itemId
      });
    }
  })

  app.delete('/items/:itemId', async (req, res) => {
    try {
      const item = await Item.findByIdAndRemove(req.params.itemId)
      if (!item) {
        return res.status(404).send({
          message: 'Item not found with id ' + req.params.itemId
        })
      }

      res.send({ message: 'Deleted Item successfully!'})
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Item not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error updating Item with id " + req.params.itemId
      });
    }
  })
}
