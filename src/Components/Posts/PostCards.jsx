import React, { useEffect, useRef, useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import constants from '../../Constants'
import ContextAPI from '../../Context/ContextAPI'
import EditPost from './EditPost'

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
    const saveEdits = (id, title, body) => {
        allPosts.forEach((post) => {
            if (post.id === parseInt(id)) {
                post.title = title
                post.body = body
            }
        })
        setAllPosts(allPosts)
        setEditToggle(!editToggle)
    }
    useEffect(() => {
        setAllPosts(props.allPosts)
    }, [])

    return (
        <div className='justify-content-center'>
            {
                context.postsData ? context.postsData.map((post) => {
                    return (
                        <div className="card mb-3" key={post.id}>
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <button className="btn btn-dark" value={post.id} onClick={openComments}>{constants.comments}</button>
                            </div>
                            {
                                context.isLoggedIn && props.currentUser.id === post.userId && context.isLoggedIn ?
                                    <div className='text-end p-3'>
                                        <button className='btn btn-warning' value={post.id} onClick={editHandler}>{constants.edit}</button>
                                        <button className='btn btn-danger ms-2' value={post.id} onClick={props.deleteThePost}>{constants.delete}</button>
                                    </div>
                                    : null
                            }
                            {
                                context.isLoggedIn && props.currentUser.id === post.userId && parseInt(activePostID) === parseInt(post.id) && editToggle ?
                                    <EditPost saveEdits={saveEdits} title={post.title} body={post.body} id={post.id} />
                                    : null
                            }
                        </div>
                    )
                }) : <div>{constants.loading}</div>
            }
        </div>
    )
}

export default PostCards