import React from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

function App() {
  const clickMe = async () => {
    const items = await axios.get('http://localhost:5000/api/items')
    console.log(items)
  }
  return (
    <div className="App">
      <button onClick={clickMe}>
        Click me
      </button>
    </div>
  );
}

export default App;
