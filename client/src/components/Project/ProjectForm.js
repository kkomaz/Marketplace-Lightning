import React from 'react'
import axios from 'axios'
import {
  Button,
  Card,
  Form,
} from 'react-bootstrap'

function ProjectForm(props) {
  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const {
      formTitle,
      formDescription,
      formGoal,
      formImageUrl,
    } = e.currentTarget

    const params = {
      title: formTitle.value,
      description: formDescription.value,
      goal: formGoal.value,
      image_url: formImageUrl.value,
    }

    try {
      const result = await axios.post('/api/projects', params)
      const project = result.data
      props.addProject(project)

      formTitle.value = ''
      formDescription.value = ''
      formGoal.value = ''
      formImageUrl.value = ''
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <Card style={{ padding: '20px', marginBottom: '10px' }}>
      <Form onSubmit={e => handleSubmit(e)}>
        <Form.Group controlId="formTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter title"
          />
        <Form.Control.Feedback type="invalid">Please enter a title</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Description"
          />
        <Form.Control.Feedback type="invalid">Please enter a description</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formGoal">
          <Form.Label>Goal (USD)</Form.Label>
          <Form.Control
            required
            type="number"
            placeholder="Enter Goal"
          />
        <Form.Control.Feedback type="invalid">Please enter a goal</Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="formImageUrl">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Enter Image URL"
          />
        <Form.Control.Feedback type="invalid">Please enter a image url</Form.Control.Feedback>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Card>
  )
}

export default ProjectForm
