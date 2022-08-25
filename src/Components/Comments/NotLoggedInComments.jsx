import React, { useRef, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ContextAPI from '../../Context/ContextAPI'
import constants from '../../Constants'
import NotLoggedInHeader from '../Headers/NotLoggedInHeader'

const NotLoggedInComments = () => {
    const context = useContext(ContextAPI)
    const location = useLocation()
    const navigate = useNavigate()
    const [commentsData, setCommentsData] = useState(location.state.commentsData)

    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <div>
            <div className='mb-5'>
                <NotLoggedInHeader header={constants.not_logged_in} />
            </div>
            <div className='p-4'>
                <button className='btn btn-dark' onClick={goBackHandler}>{constants.go_back}</button>
            </div>
            <div>
                <div className="card mb-3">
                    <h1 className='p-3'>Post</h1>
                    <div className="card-body pb-5">
                        <h5 className="card-title">{location.state.el.title}</h5>
                        <p className="card-text">{location.state.el.body}</p>
                    </div>
                    <div className='pb-5'>
                        <h2 className='p-4'>{constants.comments}</h2>
                        {
                            context.commentsData ? context.commentsData.map((comment) => {
                                if (comment.postId === location.state.el.id) {
                                    return (<div className='w-50 pt-3 ps-5 bg-light ,b-2' key={comment.id}>
                                        {comment.name}
                                    </div>)
                                }
                            }) : <div className='ps-5'> {constants.loading} </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotLoggedInComments