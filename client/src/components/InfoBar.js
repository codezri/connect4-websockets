import React from 'react'

const InfoBar = ({message, color}) => {
  let style = {color: color, backgroundColor: 'black', padding: '5px'};
  return <p style={style}>{message}</p>
}


export default InfoBar