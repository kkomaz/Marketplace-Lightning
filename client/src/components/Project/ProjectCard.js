import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Card, Modal } from 'react-bootstrap'
import ProjectDetail from './ProjectDetail'
import ContributionForm from '../Contribution/ContributionForm'

function ProjectCard(props) {
  const { project } = props

  const [showDetails, setShowDetails] = useState(false)
  const [showContribution, setShowContribution] = useState(false)

  const handleCloseDetails = () => {
    setShowDetails(false)
  }

  const handleOpenDetails = () => {
    setShowDetails(true)
  }

  const handleCloseContributions = () => {
    setShowContribution(false)
  }

  const handleOpenContributions = () => {
    setShowContribution(true)
  }

  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant="top" src={project.image_url} />
        <Card.Body>
          <Card.Title>{project.title}</Card.Title>
          <Card.Text>
            Goal: ${project.goal}
          </Card.Text>
          <div style={{ display: 'flex' }}>
            <Button size="sm" onClick={handleOpenContributions} style={{ marginRight: '10px' }}>
              Contribute Project
            </Button>
            <Button size="sm" onClick={handleOpenDetails} variant="success">
              Show Project Details
            </Button>
          </div>
        </Card.Body>
      </Card>

      <Modal show={showDetails} onHide={handleCloseDetails}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProjectDetail project={project} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDetails}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showContribution} onHide={handleCloseContributions}>
        <Modal.Header closeButton>
          <Modal.Title>Contribution Info</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ContributionForm
            projectId={project._id}
            onComplete={handleCloseContributions}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseContributions}>
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
