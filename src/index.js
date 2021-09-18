import React from 'react';

import ReactDOM from 'react-dom';

import Routes from './Routes';

import 'bootstrap/dist/css/bootstrap.min.css';

import Menu from './components/Menu'

ReactDOM.render(
  <React.StrictMode>
    <Menu />
    <Routes />
  </React.StrictMode>,
  document.getElementById('root')
);

