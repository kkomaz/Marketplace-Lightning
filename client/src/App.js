import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

function App() {
  const clickMe = async () => {
    const items = await axios.get('http://localhost:5000/api/items')
    console.log(items)
  }

  return (
    <div className="App">
      <Button variant="primary" onClick={clickMe}>
        Click Me
      </Button>
    </div>
  );
}

export default App;
