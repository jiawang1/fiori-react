import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept('../node_modules/@jay.wang/fundamental-react/es/index.js', () => {
    console.log('update fundamental component');
  });
}
