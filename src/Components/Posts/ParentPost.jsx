import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import HeaderLoggedIn from '../Headers/HeaderLoggedIn'
import PostCards from './PostCards'
import { useLocation } from 'react-router-dom'

const ParentPost = () => {
    const location = useLocation()
    const [currentUser] = useState(location.state.isLoggedIn[0])
    const [addNewPost, setAddNewPost] = useState(false)
    const [allPosts, setAllPosts] = useState(location.state.postsData)
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
            id: allPosts.length + 1,
            userId: currentUser.id
        }
        allPosts.push(newPost)
        setAllPosts(allPosts)
        setAddNewPost(false)
    }

    const deleteThePost = (e) => {
        console.log(e)
        let posts = allPosts.filter(post =>  post.id !== parseInt(e.target.value) )
        setAllPosts(posts)
    }

    useEffect(() => {}, [allPosts])


    return (
        <div className=''>
            <div>
                <HeaderLoggedIn header="Posts" />
            </div>
            <div className='ms-2'>
                <button className='btn ms-5 btn-outline-dark mt-5 pt-3 ps-5 pe-5' onClick={openOrCloseModal} >
                    {
                        !addNewPost ? <p>Create New Post</p> : <p>Close the dialog</p>
                    }
                </button>
            </div>

            {
                addNewPost ?
                    <div className='w-75 justify-content-center align-items-center ms-5 mt-5'>
                        <div className='mb-3 ms-3 font-weight-bold'>New Post</div>
                        <div className="form-group mb-4">
                            <input type="text" className="form-control ms-3" ref={postTitleRef} name="title" placeholder="Title" />
                        </div>
                        <div className="form-group mb-4">
                            <textarea rows='4' type="text" className="form-control ms-3" ref={postBodyRef} name="body" placeholder="Body" />
                        </div>
                        <button className='btn ms-3 btn-outline-dark' onClick={publishPost} >
                            Publish The Post
                        </button>
                    </div>
                    : null
            }

            <div className='w-100 p-5 d-flex align-items-center justify-content-center'>
                <PostCards allPosts={allPosts} currentUser={currentUser} deleteThePost={deleteThePost} commentsData={location.state.commentsData}/>
            </div>
        </div>
    )
}

export default ParentPost