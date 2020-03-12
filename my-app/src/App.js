import React from 'react';
import './App.css';
import Logo from './components/Logo';
import Excel from './components/Excel';
import Button from './components/Button';

var headers = [
  "Book", "Author", "Language", "Published", "Sales"
];

var data = [
  ["The Lord of the Rings", "J. R. R. Tolkien", "English", "1954-1955", "150 million"],
  ["Le Petit Prince (The Little Prince)", "Antoine de Saint-Exupéry", "French", "1943", "140 million"],
  ["Harry Potter and the Philosopher's Stone", "J. K. Rowling", "English", "1997", "107 million"],
  ["And Then There Were None", "Agatha Christie", "English", "1939", "100 million"],
  ["Dream of the Red Chamber", "Cao Xueqin", "Chinese", "1754-1791", "100 million"],
  ["The Hobbit", "J. R. R. Tolkien", "English", "1937", "100 million"],
  ["She: A History of Adventure", "H. Rider Haggard", "English", "1887", "100 million"],
];

function App() {
  return (

    <div className="App">
      <Logo />
      <Button aria-label="Custom Aria Label" className="2nd-class" onClick={() => console.log('ouch')}>Alert this</Button>
      <Button href="#">Follow Me</Button>

      <Excel headers={headers} initialData={data} />
    </div>
  );
}

export default App;
