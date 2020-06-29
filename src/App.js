import React from 'react';
import Posts from './components/Posts';
import 'normalize.css';
import './App.css';

const App = () => {
  return (
    <>
      <div className='container'>
        <Posts />     
      </div>
    </>
  );
};

export default App;