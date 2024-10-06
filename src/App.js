import logo from './logo.svg';
import React from 'react';


import './styles/App.css';
import Game from './components/Game';

function App() {
  return (
    <div className="App">
      <h1>Pokemon Battle Game</h1>
      <Game />
    </div>
  );
}

export default App;
