import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import HeaderLoggedIn from '../Headers/HeaderLoggedIn'
import SpecificPost from './SpecificPost'

const ParentComments = () => {
    const location = useLocation()
    const [allComments, setAllComments] = useState()
    const [allCommentsCount, setAllCommentsCount] = useState()
    const commentRef = useRef()
    console.log(allComments)
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://jsonplaceholder.typicode.com/posts/' + location.state.id + '/comments/')
                .then((response) => {
                    setAllComments(response.data)
                })
                .catch(() => console.log("There must be some issue. Data didn't retrieve."), [])
        }
        fetchData()
        const fetchDataForCount = async () => {
            await axios.get('https://jsonplaceholder.typicode.com/comments/')
                .then((response) => {
                    setAllCommentsCount(response.data.length)
                })
                .catch(() => console.log("There must be some issue. Data didn't retrieve."), [])
        }
        fetchDataForCount()
    }, [])

    useEffect(() => {}, [allComments])

    console.log(allCommentsCount, "count")

    const addNewComment = () => {
        const comment = {
            name: commentRef.current.value,
            postId: location.state.id,
            id: allCommentsCount + 1,
        }
        allComments.push(comment)
        setAllComments(allComments)
        setAllCommentsCount(allCommentsCount+1)
    }

    return (
        <div>
            <HeaderLoggedIn header="Comments" />
            <div>
                <div className="card mb-3">
                    <h1 className='p-3'>Post</h1>
                    <div className="card-body pb-5">
                        <h5 className="card-title">{location.state.title}</h5>
                        <p className="card-text">{location.state.body}</p>
                    </div>
                    <div className='pb-5'>
                        <h2 className='p-4'>Comments</h2>
                        {
                            allComments ? allComments.map((comment) => {
                                return (<div className='w-50 pt-3 ps-5 bg-light ,b-2'>
                                    {comment.name}
                                </div>)
                            }) : <div className='ps-5'> Loading... </div>
                        }
                    </div>
                    <div className='mb-4 w-75 ms-4'>
                        <div class="w-75 mb-3 ms-4">
                            <div class="input-group">
                                <input type="text" class="form-control" ref={commentRef} name="name" placeholder="Add new comment" />
                                <div class="input-group-prepend">
                                    <button class="input-group-text" id="inputGroupPrepend2" onClick={addNewComment}>Publish Comment</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ParentComments