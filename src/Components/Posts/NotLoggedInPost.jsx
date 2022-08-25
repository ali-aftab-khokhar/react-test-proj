import React, { useContext, useEffect, useState } from 'react'
import ContextAPI from '../../Context/ContextAPI'
import constants from '../../Constants'
import NotLoggedInPostCards from './NotLoggedInPostCards'
import NotLoggedInHeader from '../Headers/NotLoggedInHeader'
import { useNavigate } from 'react-router-dom'

const NotLoggedInPost = () => {
  const context = useContext(ContextAPI)
  const navigate = useNavigate()
  useEffect(() => { }, [context.postsData, context.commentsData])
  const login = () => {
    navigate('/')
  }
  return (
    <div>
      <div className='mb-5'>
        <NotLoggedInHeader header={constants.not_logged_in}/>
      </div>
      <div className='ps-4 mb-5'>
        <button className='btn btn-dark' onClick={login}>{constants.login}</button>
      </div>
      {
        context.postsData && context.commentsData ?
          <div>
            <NotLoggedInPostCards postsData={context.postsData} commentsData={context.commentsData} />
          </div>
          : <div>{constants.loading}</div>
      }
    </div>
  )
}

export default NotLoggedInPost