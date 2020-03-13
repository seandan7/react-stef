import React from 'react';
import './App.css';
import Logo from './components/Logo';
import Excel from './components/Excel';
import Button from './components/Button';
import Suggest from './components/Suggest';
import Rating from './components/Rating';
import FormInput from './components/FormInput';
import Forms from './components/Forms';
import Dialog from './components/Dialog';
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
      <Button aria-label="Custom Aria Label" className="2nd-class" onClick={() => alert('ouch')}>Alert this</Button>
      <Button href="#">Follow Me</Button>
      <h2>Suggest</h2>
      <Suggest options={['first','second','third','fourth']}/>
      <h2>Rating</h2>
      <h3>No initial Value</h3><Rating />
      <h3>Initial Value 4</h3><Rating defaultValue={4}/>
      <h3>Goes to 11</h3><Rating max={11}/>
      <h3>Read-only</h3><Rating readonly={true} defaultValue={3}/>
      <h2>Form Inputs</h2>
      <table>
        <tbody>
          <tr>
            <td>Vanilla input</td>  
            <td><FormInput /></td>
          </tr>
          <tr>
            <td>Prefilled input</td>  
            <td><FormInput defaultValue="Default text val" /></td>
          </tr>
          <tr>
            <td>Year</td>  
            <td><FormInput type="year"/></td>
          </tr>
          <tr>
            <td>Rating</td>  
            <td><FormInput type="rating" defaultValue={5}/></td>
          </tr>
          <tr>
            <td>Suggest</td>
            <td><FormInput 
              type="suggest"
              options={['red','green','blue']}
              defaultValue="green"
            /></td>
          </tr>
          <tr>
            <td>Vanilla Textarea</td>
            <td><FormInput type="text" /></td>
          </tr>
        </tbody>
      </table>
      <h2>Forms</h2>
      <Forms 
        fields={[
          {label: 'Rating', type: 'rating', id: 'rateme'},
          {label: 'Greetings', id: 'freetext'}
        ]}
        initialData={
          {
            rateme: 4,
            freetext: 'hello'
          }
        }
      />
      <h2>Dialog</h2>
      <Dialog
        hreader="Out-of-the-box example"
        onAction={type => alert(type)}>
          Hello Dialoag
      </Dialog>
      <Excel headers={headers} initialData={data} />
    </div>
  );
}

export default App;
