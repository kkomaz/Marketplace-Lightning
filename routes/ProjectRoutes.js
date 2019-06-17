const mongoose = require('mongoose');
const Project = mongoose.model('projects');

module.exports = app => {
  app.post('/api/projects', async (req, res) => {
    if (!req.body.description) {
      return res.status(400).send({
        message: 'Project content can not be empty'
      })
    }

    const project = new Project({
      title: req.body.title,
      goal: req.body.goal,
      description: req.body.description,
      image_url: req.body.image_url,
    })

    try {
      const data = await project.save()
      res.send(data)
    } catch (e) {
      res.status(500).send({
        message: e.message || "Some error occurred while creating the Project."
      });
    }
  })

  app.get('/api/projects', async (req, res) => {
    try {
      const projects = await Project.find()
      res.send(projects)
    } catch (e) {
      res.status(500).send({
        message: e.message || "Some error occured while retrieving projects"
      })
    }
  })

  app.get('/api/projects/:projectId', async (req, res) => {
    try {
      const project = await Project.findById(req.params.projectId)
      if (!project) {
        return res.status(404).send({
          message: "Project not found with id " + req.params.projectId
        })
      }
      res.send(project)
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Project not found with id " + req.params.projectId
        });
      }

      return res.status(500).send({
        message: "Error retrieving note with id " + req.params.projectId
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
      const project = await Project.findByIdAndUpdate(req.params.projectId, {
        title: req.body.title,
        goal: req.body.goal,
        description: req.body.description,
        image_url: req.body.image_url,
      }, { new: true })

      if (!project) {
        return res.status(404).send({
          message: 'Project not found with id ' + req.params.projectId
        })
      }

      res.send(project)
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Project not found with id " + req.params.projectId
        });
      }
      return res.status(500).send({
        message: "Error updating Project with id " + req.params.projectId
      });
    }
  })

  app.delete('/api/projects/:projectId', async (req, res) => {
    try {
      const project = await Project.findByIdAndRemove(req.params.projectId)
      if (!project) {
        return res.status(404).send({
          message: 'Project not found with id ' + req.params.projectId
        })
      }

      res.send({ message: 'Deleted Project successfully!'})
    } catch (e) {
      if (e.kind === 'ObjectId') {
        return res.status(404).send({
            message: "Project not found with id " + req.params.projectId
        });
      }
      return res.status(500).send({
        message: "Error updating Project with id " + req.params.projectId
      });
    }
  })
}
