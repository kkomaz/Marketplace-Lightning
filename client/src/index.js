import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<App />, document.getElementById('root'));

const setAxiosHeaders = () => {
  axios.defaults.baseURL = process.env.NODE_ENV === 'production' ? 'https://enigmatic-sierra-95404.herokuapp.com' : 'https://92ab375c.ngrok.io'
}

setAxiosHeaders()

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
