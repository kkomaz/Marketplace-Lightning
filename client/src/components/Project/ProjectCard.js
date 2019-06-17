import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Modal } from 'react-bootstrap'

function ProjectCard(props) {
  const { project } = props

  const [show, setShow] = useState(false)

  const handleClose = () => {
    setShow(false)
  }

  const handleShow = () => {
    setShow(true)
  }

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={project.image_url} />
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text>
            {project.description}
          </Card.Text>
          <Card.Text>
            Goal: {project.goal}
          </Card.Text>
          <div style={{ display: 'flex' }}>
            <Button size="sm" style={{ marginRight: '10px' }}>
              Contribute Project
            </Button>
            <Button size="sm" onClick={handleShow} variant="success">
              Show Contributors
            </Button>
          </div>
        </Card.Body>
      </Card>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Contributors</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Woohoo, you're reading this text in a modal!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

ProjectCard.propTypes ={
  project: PropTypes.shape({
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    goal: PropTypes.number.isRequired,
    image_url: PropTypes.string.isRequired,
  }).isRequired
}

export default ProjectCard
