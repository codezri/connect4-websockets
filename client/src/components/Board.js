import React from 'react'

const Board = ({board, onColumnClick}) => {
  let cells = []
  let onClick = onColumnClick
  for (let i = 0; i < 6; ++i) {
    for (let j = 0; j < 8; ++j) {
      let cell = <g key={i*8+j} onClick={(event) => onClick(j)}>
          <rect x={j * 50} y={i * 50} width={50} height={50} fill={'blue'}/>
          <circle  cx={24 + j * 50} cy={24 + i * 50} r={15} fill={board[i][j]} />
      </g>
      cells.push(cell)
    }
  }
  return <svg width={400} height={300}>{cells}</svg>
}


export default Board