const mongoose = require('mongoose');
const Project = mongoose.model('projects');

module.exports = app => {
  app.post('/api/projects', async (req, res) => {
    if (!req.body.description) {
      return res.status(400).send({
        message: 'Project content can not be empty'
      })
    }

    const item = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
    })

    try {
      const data = await item.save()
      res.send(data)
    } catch (e) {
      res.status(500).send({
        message: e.message || "Some error occurred while creating the Project."
      });
    }
  })

  app.get('/api/projects', async (req, res) => {
    try {
      const items = await Project.find()
      res.send(items)
    } catch (e) {
      res.status(500).send({
        message: e.message || "Some error occured while retrieving items"
      })
    }
  })

  app.get('/api/projects/:projectId', async (req, res) => {
    try {
      const item = await Project.findById(req.params.itemId)
      if (!item) {
        return res.status(404).send({
          message: "Project not found with id " + req.params.itemId
        })
      }
      res.send(item)
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Project not found with id " + req.params.itemId
        });
      }

      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.itemId
      });
    }
  })

  app.put('/api/projects/:projectId', async (req, res) => {
    if (!req.body.description) {
      return res.status(400).send({
        message: 'Project content can not be empty'
      })
    }

    try {
      const item = await Project.findByIdAndUpdate(req.params.itemId, {
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
      }, { new: true })

      if (!item) {
        return res.status(404).send({
          message: 'Project not found with id ' + req.params.itemId
        })
      }

      res.send(item)
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Project not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error updating Project with id " + req.params.itemId
      });
    }
  })

  app.delete('/api/projects/:projectId', async (req, res) => {
    try {
      const item = await Project.findByIdAndRemove(req.params.itemId)
      if (!item) {
        return res.status(404).send({
          message: 'Project not found with id ' + req.params.itemId
        })
      }

      res.send({ message: 'Deleted Project successfully!'})
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Project not found with id " + req.params.itemId
        });
      }
      return res.status(500).send({
        message: "Error updating Project with id " + req.params.itemId
      });
    }
  })
}
