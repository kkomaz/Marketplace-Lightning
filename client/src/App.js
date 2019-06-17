import React, { useState } from 'react';
import axios from 'axios';
import {
  Button,
  Container,
  Col,
  Row,
} from 'react-bootstrap';

function App() {
  const [show, setShow] = useState(false)

  const clickMe = async () => {
    const items = await axios.get('http://localhost:5000/api/items')
    console.log(items)
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
    </Container>
  );
}

export default App;
