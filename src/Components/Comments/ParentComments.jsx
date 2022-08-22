import React, { useRef, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HeaderLoggedIn from '../Headers/HeaderLoggedIn'
import ContextAPI from '../../Context/ContextAPI'

const ParentComments = () => {
    const context = useContext(ContextAPI)
    const location = useLocation()
    const navigate = useNavigate()
    const [commentsData, setCommentsData] = useState(location.state.commentsData)
    const [allCommentsCount, setAllCommentsCount] = useState()
    const commentRef = useRef()

    const addNewComment = () => {
        const comment = {
            name: commentRef.current.value,
            postId: location.state.el.id,
            id: context.commentsData.length + 1,
        }
        context.commentsData.push(comment)
        setCommentsData(commentsData)
        setAllCommentsCount(commentsData.length + 1)
        commentRef.current.value = ''
    }

    const goBackHandler = () => {
        navigate(-1)
    }

    return (
        <div>
            <HeaderLoggedIn header="Comments" />
            <div className='p-4'>
                <button className='btn btn-dark' onClick={goBackHandler}>Go Back</button>
            </div>
            <div>
                <div className="card mb-3">
                    <h1 className='p-3'>Post</h1>
                    <div className="card-body pb-5">
                        <h5 className="card-title">{location.state.el.title}</h5>
                        <p className="card-text">{location.state.el.body}</p>
                    </div>
                    <div className='pb-5'>
                        <h2 className='p-4'>Comments</h2>
                        {
                            context.commentsData ? context.commentsData.map((comment) => {
                                if (comment.postId === location.state.el.id){
                                    return (<div className='w-50 pt-3 ps-5 bg-light ,b-2' key={comment.id}>
                                    {comment.name}
                                </div>)
                                }   
                            }) : <div className='ps-5'> Loading... </div>
                        }
                    </div>
                    {
                        location.state.el ?
                            <div className='mb-4 w-75 ms-4'>
                                <div className="w-75 mb-3 ms-4">
                                    <div className="input-group">
                                        <input type="text" className="form-control" ref={commentRef} name="name" placeholder="Add new comment" />
                                        <div className="input-group-prepend">
                                            <button className="input-group-text" id="inputGroupPrepend2" onClick={addNewComment}>Publish Comment</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            : null
                    }
                </div>
            </div>
        </div>
    )
}

export default ParentComments