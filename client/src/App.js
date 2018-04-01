import React, {Component} from 'react'
import './App.css'
import InfoBar from './components/InfoBar'
import Board from './components/Board'
//  import io from 'socket.io'
import openSocket from 'socket.io-client';


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      board: Array(6).fill(0).map(x => Array(8).fill('white')),
      socket: openSocket('http://localhost:1337'),
      message: 'Waiting for another player...'
    }

    let self = this
    this.state.socket.on('board', board => {
      this.setState(...self.state, {board: board})
    });
    this.state.socket.on('color', color => {
      this.setState(...self.state, {color: color})
    });
    this.state.socket.on('turn', player => {
      if (player === this.state.color) {
        this.setState(...self.state, {message: "You're up. What's your move?"})
      } else {
        this.setState(...self.state, {message: player + ' is thinking...'})
      }
    });

    this.state.socket.on('victory', player => {
      if (player === this.state.color) {
        this.setState(...self.state, {message: 'You win!'})
      } else {
        this.setState(...self.state, {message: 'You lose!'})
      }
    });
  }

  onColumnClick = column => this.state.socket.emit('click', column);

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connect Four</h1>
        </header>
        <InfoBar color={this.state.color} message={this.state.message} />
        <Board board={this.state.board} onColumnClick={this.onColumnClick}/>
      </div>
    )
  }
}

export default App
