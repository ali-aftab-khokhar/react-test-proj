import React, { useEffect, useRef, useState, useContext } from 'react'
import HeaderLoggedIn from '../Headers/HeaderLoggedIn'
import PostCards from './PostCards'
import { useLocation, useNavigate } from 'react-router-dom'
import ContextAPI from '../../Context/ContextAPI'
import constants from '../../Constants'

const ParentPost = () => {
    const navigate = useNavigate()
    const context = useContext(ContextAPI)
    useEffect(() => {
        if (!context.isLoggedIn.id) {
            navigate('/posts/notloggedin')
        }
    }, [context.isLoggedIn, navigate])
    const location = useLocation()
    const [postDelete, setPostDelete] = useState(false)
    const [addNewPost, setAddNewPost] = useState(false)
    const postTitleRef = useRef()
    const postBodyRef = useRef()

    const openOrCloseModal = () => {
        setAddNewPost(!addNewPost)
    }

    const publishPost = (e) => {
        e.preventDefault()
        const newPost = {
            title: postTitleRef.current.value,
            body: postBodyRef.current.value,
            id: context.postsData.length + 1,
            userId: context.isLoggedIn.id
        }
        context.postsData.push(newPost)
        setAddNewPost(false)
    }

    const deleteThePost = (e) => {
        const post = context.postsData.filter(post => post.id !== parseInt(e.target.value))
        context.commentsData.filter((comment) => comment.postId !== post.id)
        context.postsData = post
        setPostDelete(!postDelete)

    }

    useEffect(() => { }, [context.postsData])

    const logoutHandle = () => {
        navigate("/")
    }

    return (
        <div className=''>
            <div>
                <HeaderLoggedIn header="Posts" />
            </div>
            <div>
                <div className='p-4'>
                    <button className='btn btn-dark' onClick={logoutHandle}>{constants.logout}</button>
                </div>
                <div className='ms-2'>
                    <button className='btn ms-5 btn-outline-dark mt-5 pt-3 ps-5 pe-5' onClick={openOrCloseModal} >
                        {
                            !addNewPost ? <p>{constants.create_new_post}</p> : <p>{constants.close_the_dialog}</p>
                        }
                    </button>
                </div>
            </div>

            {
                addNewPost ?
                    <div className='w-75 justify-content-center align-items-center ms-5 mt-5'>
                        <div className='mb-3 ms-3 font-weight-bold'>{constants.new_post}</div>
                        <div className="form-group mb-4">
                            <input type="text" className="form-control ms-3" ref={postTitleRef} name="title" placeholder="Title" />
                        </div>
                        <div className="form-group mb-4">
                            <textarea rows='4' type="text" className="form-control ms-3" ref={postBodyRef} name="body" placeholder="Body" />
                        </div>
                        <button className='btn ms-3 btn-outline-dark' onClick={publishPost} >
                            {constants.publish_the_post}
                        </button>
                    </div>
                    : null
            }

            <div className='w-100 p-5 d-flex align-items-center justify-content-center'>
                {
                    context.commentsData ?
                        <PostCards allPosts={context.postsData} currentUser={context.isLoggedIn} deleteThePost={deleteThePost} commentsData={location.state.commentsData} />
                        : null
                }
            </div>
        </div>
    )
}

export default ParentPost