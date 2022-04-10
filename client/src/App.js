import React, {Component} from 'react'
import './App.css'
import InfoBar from './components/InfoBar'
import Board from './components/Board'
import { io } from 'socket.io-client'

const socket = io('http://localhost:1337')

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      board: Array(6).fill(0).map(x => Array(8).fill('white')),
      message: 'Waiting for another player...',
      yourTurn: false
    }

    let self = this
    socket.on('board', board => {
      this.setState({...self.state, board: board})
    });
    socket.on('color', color => {
      this.setState({...self.state, color: color})
    });
    socket.on('turn', player => {
      if (player === this.state.color) {
        this.setState({...self.state, message: "You're up. What's your move?", yourTurn: true})
      } else {
        this.setState({...self.state, message: player + ' is thinking...', yourTurn: false})
      }
    });

    socket.on('victory', player => {
      let newState = {yourTurn: false}
      if (player === this.state.color) {
        newState['message'] = 'You win!'
      } else {
        newState['message'] = 'You lose!'
      }
      this.setState({...self.state, ...newState})
    });
  }

  onColumnClick = column => socket.emit('click', column);

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Connect Four</h1>
        </header>
        <InfoBar color={this.state.color} message={this.state.message} />
        <Board board={this.state.board} onColumnClick={this.onColumnClick} yourTurn={this.state.yourTurn}/>
      </div>
    )
  }
}

export default App
