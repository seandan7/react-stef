import React from 'react';
import './App.css';
import Logo from './components/Logo';
import Whinepad from './components/Whinepad';
import schema from './schema';


var data = JSON.parse(localStorage.getItem('data'));

if(!data) {
  data = {};
  schema.forEach(item => data[item.id] = item.sample);
  data = [data];
}

function App() {
  return (
    <div>
      <div className="app-header">
        <Logo />
      </div>
      <Whinepad schema={schema} initialData={data}/>
    </div>
  );
}

export default App;
