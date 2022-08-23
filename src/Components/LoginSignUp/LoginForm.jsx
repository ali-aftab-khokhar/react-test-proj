import React, { useRef } from 'react'
import Labels from './Labels'

const LoginForm = (props) => {
    const usernameRef = useRef(null)
    const passwordRef = useRef(null)

    const onSubmit = (e) => {
        e.preventDefault()
        props.existingUserOrNot(usernameRef.current.value, passwordRef.current.value)
    }

    return (
        <div className='p-5 ms-5 bg-light w-75'>
            <div className='text-center mb-5'>
                Login To Your Account
            </div>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-4">
                        <Labels name="Username" />
                        <input type="text" className="form-control" ref={usernameRef} name="username" placeholder="Username" />
                    </div>
                    <div className="form-group mb-4">
                        <Labels name="Password" />
                        <input type="password" className="form-control" name="password" placeholder="Password" ref={passwordRef} />
                    </div>
                    <div className="mb-4 mt-5 text-center ">
                        <input type="submit" className='p-2 w-50 btn btn-outline-dark' value="Log In" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginForm