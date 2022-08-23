import React from 'react'

const NotLoggedInHeader = (props) => {
  return (
    <div className='bg-dark text-light p-4 text-center'>
        <h1>{props.header}</h1>
    </div>
  )
}

export default NotLoggedInHeader