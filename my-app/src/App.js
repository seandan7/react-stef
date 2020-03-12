import React from 'react';
import FancyLink from './FancyLink.js';
import './App.css';

function App() {
  return (
    <div className="App">
      Hello world
    <FancyLink
      href="https://example.org"
      style={{color: 'white'}}
      target="_blank"
      size="medium"
    >Test</FancyLink>


    </div>
  );
}

export default App;
