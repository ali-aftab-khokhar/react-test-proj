import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotLoggedInPostCards = (props) => {
    const navigate = useNavigate()
    const openComments = (e) => {
        const el = props.postsData.find((elem) => {
            if (elem.id === parseInt(e.target.value)) {
                return elem
            }
        })
        navigate('/posts/' + el.id + '/comments', { state: { el: el, commentsData: props.commentsData } })
    }
    return (
        <div className='justify-content-center'>
            {
                props.postsData ? props.postsData.map((post) => {
                    return (
                        <div className="card mb-3" key={post.id}>
                            <div className="card-body">
                                <h5 className="card-title">{post.title}</h5>
                                <p className="card-text">{post.body}</p>
                                <button className="btn btn-dark" value={post.id} onClick={openComments}>Comments</button>
                            </div>

                        </div>
                    )
                }) : <div>Data Loading Failed</div>
            }
        </div>
    )
}

export default NotLoggedInPostCards