import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PostCards = (props) => {
    const [currentUser] = useState(props.currentUser)
    const navigate = useNavigate()
    const openComments = (e) => {
        const el = props.allPosts.find((elem) => {
            if (elem.id === parseInt(e.target.value)){
                return elem
            }
        })
        navigate('/posts/' + el.id + '/comments', {state: el, currentUser})
    }
    return (
        <div className='justify-content-center'>
            {
                props.allPosts.reverse().map((post) => {
                    return (
                        <div className="card mb-3" key={post.id}>
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <button className="btn btn-dark" value={post.id} onClick={openComments}>Comments</button>
                            </div>
                            {
                                props.currentUser.id === post.userId ?
                                <div className='text-end p-3'>
                                    <button className='btn btn-warning'>Edit</button>
                                    <button className='btn btn-danger ms-2' value={post.id} onClick={props.deleteThePost}>Delete</button> 
                                </div> 
                                : null
                            }
                        </div>
                    )
                })
            }
        </div>
    )
}

export default PostCards