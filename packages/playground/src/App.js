import React, { Component } from 'react';
import { hot } from 'react-hot-loader';
import './App.scss';
import Routes from './Routes';
import '@babel/polyfill';

const App = () => (
  <div className="App" id="app">
    <Routes />
  </div>
);

export default hot(module)(App);
