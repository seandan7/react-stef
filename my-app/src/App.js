import React from 'react';
import FancyLink from './components/FancyLink';
import './App.css';
import Forms from './components/Forms';
import Logo from './components/Logo';
function App() {
  return (
    
    <div className="App">
      <Logo />
      Hello world
      <FancyLink
        href="https://example.org"
        style={{ color: 'white' }}
        target="_blank"
        size="medium"
      >Test</FancyLink>
      <Forms />
    </div>
  );
}
 
export default App;
