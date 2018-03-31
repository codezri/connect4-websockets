import React from 'react'

const InfoBar = ({message, color}) => {
  let style = {color: color};
  return <p style={style}>{message}</p>
}


export default InfoBar