import React, { useContext, useEffect, useState } from 'react'
import HeaderHomePage from '../Headers/HeaderHomePage'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import ContextAPI from '../../Context/ContextAPI'
import constants from '../../Constants'

const ParentLoginSignUp = (props) => {
    const context = useContext(ContextAPI)
    const navigate = useNavigate()
    useEffect(() => {
        setAllUsers(context.usersData)
    }, [context.usersData])
    const [allUsers, setAllUsers] = useState([])
    useEffect(() => { }, [context.usersData])
    useEffect(() => {
        setAllUsers(allUsers)
    }, [allUsers])
    allUsers.map((elem) => elem.password = "user")

    const addNewUser = (user) => {
        user.id = allUsers.length + 1
        allUsers.forEach((elem) => {
            if (elem.username === user.username) {
                return toast.error(constants.username_already_exists)
            }
        })
        // setAllUsers(...context.usersData, user)
        context.usersData.push(user)
        toast.success(constants.user_added)
    }

    const existingUserOrNot = (username, password) => {
        const log = allUsers.find((elem) => elem.username === username && elem.password === password)
        context.isLoggedIn = log
        if (context.isLoggedIn) {
            toast.success("Logged In")
            navigate('/posts', { state: { postsData: props.postsData, commentsData: props.commentsData } })
        }
        else {
            toast.error(constants.username_password_error)
        }
    }

    // useEffect(() => {}, [isLoggedIn])

    return (
        <div>
            <HeaderHomePage />
            <div className='d-flex w-100 pt-5 justify-content-center'>
                <div className='w-100 ms-5 ps-5'>
                    <LoginForm allUsers={allUsers} existingUserOrNot={existingUserOrNot} />
                    <ToastContainer />
                </div>
                <div className='w-100'>
                    <SignUpForm addNewUser={addNewUser} />
                </div>
            </div>
        </div>
    )
}

export default ParentLoginSignUp