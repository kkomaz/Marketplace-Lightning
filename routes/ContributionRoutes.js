const mongoose = require('mongoose')
const axios = require('axios')
const crypto = require('crypto')
const Contribution = mongoose.model('contributions')
const keys = require('../config/keys.js')

module.exports = app => {
  app.get('/api/contributions', async (req, res) => {
    const {
      paid,
      project_id,
    } = req.query

    try {
      const contributions = await Contribution.find({ paid, project_id })
      res.send(contributions)
    } catch (e) {
      res.status(500).send({
        message: e.message || "Some error occured while retrieving contributions"
      })
    }
  })

  app.post('/api/contributions', async (req, res) => {
    if (req.body.amount <= 0) {
      return res.status(400).send({
        message: 'Contribution must be greater than 0'
      })
    }

    const contribution = new Contribution({
      amount: req.body.amount,
      project_id: req.body.project_id,
      name: req.body.name,
    })

    try {
      const data = await contribution.save()

      const charge = await axios.post(keys.openNodeUrl + '/charges', {
        amount: data.amount,
        description: 'Contribution to Project',
        currency: 'USD',
        order_id: data._id,
        callback_url: 'https://e408ad4d.ngrok.io/api/contributions/webhook'
      }, { headers: { Authorization: keys.openNodeKey }})

      res.send(charge.data.data)
    } catch (e) {
      res.status(500).send({
        message: e.message || "Some error occurred while creating the Contribution."
      })
    }
  })

  app.post('/api/contributions/webhook', async (req, res) => {
    const status = req.body.status;
    const id = req.body.id;
    const hashed_order = req.body.hashed_order;
    const order_id = req.body.order_id

    if (status !== 'paid') {
      return res.send('Order not paid yet')
    }

    const ourHashedOrder = crypto
    .createHmac('sha256', keys.openNodeKey)
    .update(id)
    .digest('hex');

    console.log('Our:', ourHashedOrder);
    console.log('OpenNode:', hashed_order);

    if (ourHashedOrder !== hashed_order) {
      return res.send('Dont scam me!');
    }

    try {
      const contribution = await Contribution.findByIdAndUpdate(order_id, {
        paid: true,
      })

      if (!contribution) {
        return res.status(404).send({
          message: 'Contribution not found with id ' + order_id
        })

        res.send(contribution)
      }
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Contribution not found with id " + req.params.projectId
        });
      }
      return res.status(500).send({
        message: "Error updating Contribution with id " + req.params.projectId
      });
    }

    res.send({ status: true })
  })
}
