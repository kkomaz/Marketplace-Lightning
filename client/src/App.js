import React, { useState, useEffect } from 'react';
import axios from 'axios';
import _ from 'lodash';
import {
  Button,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

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

  return (
    <Container className="app">
      <Row className="justify-content-md-center">
        <Col md="auto">
          <Button onClick={toggleForm}>
            Show Campaign Form
          </Button>
        </Col>
      </Row>
      {
        show &&
        <Row className="justify-content-md-center">
          <Col md="auto">
            <div>Hello World</div>
          </Col>
        </Row>
      }
      <Row>
        {
          projects.map((project) => {
            return (
              <Col xs={4}>
                <div>
                  <p>{_.get(project, 'title', '')}</p>
                  <p>{_.get(project, 'description', '')}</p>
                  <p>{_.get(project, 'goal', '')}</p>
                </div>
              </Col>
            )
          })
        }
      </Row>
    </Container>
  );
}

export default App;
