import React, { useRef } from 'react'
import constants from '../../Constants'

const EditPost = (props) => {
    const postTitleRef = useRef()
    const postBodyRef = useRef()
    const saveValues = (e) => {
        props.saveEdits(e.target.value, postTitleRef.current.value, postBodyRef.current.value)
    }
    return (
        <div>
            <div className='w-75 justify-content-center align-items-center ms-5 mt-5'>
                <div className='mb-3 ms-3 font-weight-bold'>{constants.edit_post}</div>
                <div className="form-group mb-4">
                    <input type="text" className="form-control ms-3" ref={postTitleRef} defaultValue={props.title} name="title" placeholder="Title" />
                </div>
                <div className="form-group mb-4">
                    <textarea rows='4' type="text" className="form-control ms-3" ref={postBodyRef} defaultValue={props.body} name="body" placeholder="Body" />
                </div>
                <button className='btn ms-3 mb-4 btn-outline-dark' value={props.id} onClick={saveValues}>
                    {constants.edit_done}
                </button>
            </div>
        </div>
    )
}

export default EditPost