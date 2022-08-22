import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import ContextAPI from '../../Context/ContextAPI'

const PostCards = (props) => {
    const context = useContext(ContextAPI)
    const [currentUser] = useState(props.currentUser)
    const [activePostID, setActivePostID] = useState(null)
    const navigate = useNavigate()
    const postTitleRef = useRef()
    const postBodyRef = useRef()
    const [allPosts, setAllPosts] = useState([])
    const [editToggle, setEditToggle] = useState(false)
    const openComments = (e) => {
        const el = props.allPosts.find((elem) => {
            if (elem.id === parseInt(e.target.value)) {
                return elem
            }
        })
        navigate('/posts/' + el.id + '/comments', { state: { el: el, currentUser: currentUser, commentsData: props.commentsData } })
    }
    const editHandler = (e) => {
        let post = e.target.value
        setEditToggle(!editToggle)
        setActivePostID(post)
    }
    const saveEdits = (e) => {
        allPosts.forEach((post) => {
            if(post.id === parseInt(e.target.value)){
                post.title = postTitleRef.current.value
                post.body = postBodyRef.current.value
            }
        })
        setAllPosts(allPosts)
        setEditToggle(!editToggle)
    }
    useEffect(() => {}, [activePostID])
    useEffect(() => {
        setAllPosts(props.allPosts)
    })
    useEffect(() => {}, [context.postsData])


    return (
        <div className='justify-content-center'>
            {
                context.postsData.reverse().map((post) => {
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
                                        <button className='btn btn-warning' value={post.id} onClick={editHandler}>Edit</button>
                                        <button className='btn btn-danger ms-2' value={post.id} onClick={props.deleteThePost}>Delete</button>
                                    </div>
                                    : null
                            }
                            {
                                props.currentUser.id === post.userId && parseInt(activePostID) === parseInt(post.id) && editToggle ?
                                    <div className='w-75 justify-content-center align-items-center ms-5 mt-5'>
                                        <div className='mb-3 ms-3 font-weight-bold'>Edit Post</div>
                                        <div className="form-group mb-4">
                                            <input type="text" className="form-control ms-3" ref={postTitleRef} defaultValue={post.title} name="title" placeholder="Title" />
                                        </div>
                                        <div className="form-group mb-4">
                                            <textarea rows='4' type="text" className="form-control ms-3" ref={postBodyRef} defaultValue={post.body} name="body" placeholder="Body" />
                                        </div>
                                        <button className='btn ms-3 mb-4 btn-outline-dark' value={post.id} onClick={saveEdits}>
                                            Edit Done
                                        </button>
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