import React from 'react'

export default function PolluteBar(props) {
  return (
  <>
  <div className='pollutebar'>
        <h3>{props.value} </h3>
        <h4>{props.index}</h4>
  </div>
  </>
  )
}
