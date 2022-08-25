import React from 'react'
import constants from '../../Constants'

const HeaderHomePage = () => {
  return (
    <div className='bg-dark text-light p-4 text-center'>
        <h1>{constants.blog_app}</h1>
    </div>
  )
}

export default HeaderHomePage