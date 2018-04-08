import React from 'react'

const Board = ({board, onColumnClick, yourTurn}) => {
  const cells = []
  const style = {cursor: yourTurn? 'pointer' : 'no-drop'}
  for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 8; ++j) {
      let cell = <g key={i*8+j} onClick={(_) => onColumnClick(j)} style={style}>
          <rect x={20 + j * 50} y={i * 50} width={50} height={50} fill={'blue'}/>
          <circle  cx={20 + 24 + j * 50} cy={24 + i * 50} r={15} fill={board[i][j]} />
      </g>
      cells.push(cell)
    }
  }
  return <svg width={440} height={360}>
          {cells}
          <polygon points="20,300 0,360 440,360 420,300" fill={'blue'}/>
         </svg>
}


export default Board