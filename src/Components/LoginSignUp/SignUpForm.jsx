import React, { useRef } from 'react'
import constants from '../../Constants'
import Labels from './Labels'

const SignUpForm = (props) => {
    var newSignUp = {}
    const fullnameRef = useRef()
    const usernameRef = useRef()
    const passwordRef = useRef()

    const onSubmit = (e) => {
        e.preventDefault();
        newSignUp = {
            name: fullnameRef.current.value,
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }
        props.addNewUser(newSignUp)
        fullnameRef.current.value = ""
        usernameRef.current.value = ""
        passwordRef.current.value = ""
    }

    return (
        <div className='p-5 bg-light w-75 me-5'>
            <div className='mb-5 text-center '>
                Are you new? Join us today.
            </div>
            <div>
                <form onSubmit={onSubmit}>
                    <div className="form-group mb-4">
                        <Labels name={constants.full_name} />
                        <input type="text" className="form-control" placeholder={constants.enter_full_name} ref={fullnameRef} />
                    </div>
                    <div className="form-group mb-4">
                        <Labels name={constants.username} />
                        <input type="text" className="form-control" placeholder={constants.enter_username} ref={usernameRef} />
                    </div>
                    <div className="form-group mb-4">
                        <Labels name={constants.password} />
                        <input type="password" className="form-control" placeholder={constants.enter_password} ref={passwordRef} />
                    </div>
                    <div className="mb-4 mt-5 text-center ">
                        <input value="Sign Up" type="submit" className='p-2 w-50 btn btn-outline-dark' />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default SignUpForm