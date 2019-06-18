import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Col,
  Row,
} from 'react-bootstrap';
import ProjectCard from './components/Project/ProjectCard'
import ProjectForm from './components/Project/ProjectForm'

function App() {
  const [show, setShow] = useState(false)
  const [projects, setProjects] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const result = await axios.get('/api/projects')
    setProjects(result.data)
  }

  const toggleForm = () => {
    setShow(!show)
  }

  const addProject = (newProject) => {
    setProjects([...projects, newProject])
  }

  return (
    <Container className="app">
      <Row className="justify-content-md-center" style={{ marginBottom: '10px', marginTop: '10px' }}>
        <Col md="auto">
          <Button onClick={toggleForm}>
            Show Campaign Form
          </Button>
        </Col>
      </Row>

      {
        show &&
        <Row className="justify-content-md-center">
          <Col xs={12}>
            <ProjectForm addProject={addProject} />
          </Col>
        </Row>
      }

      <Row>
        {
          projects.map((project) => {
            return (
              <Col xs={4} key={project._id}>
                <ProjectCard
                  project={project}
                />
              </Col>
            )
          })
        }
      </Row>
    </Container>
  );
}

export default App;
