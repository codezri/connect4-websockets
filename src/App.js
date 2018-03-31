import React, { Component } from 'react';
import './App.css';
import InfoBar from './components/InfoBar';


class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connect4</h1>
        </header>
        <InfoBar color='red' message='Yeah, it works!'/>
      </div>
    );
  }
}

export default App;
