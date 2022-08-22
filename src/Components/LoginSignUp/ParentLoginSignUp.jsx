import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import HeaderHomePage from '../Headers/HeaderHomePage'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'
import ContextAPI from '../../Context/ContextAPI'

const ParentLoginSignUp = (props) => {
    const context = useContext(ContextAPI)
    console.log(context.usersData)
    const navigate = useNavigate()
    const [allUsers, setAllUsers] = useState([])
    const [isLogggedIn, setIsLoggedIn] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            await axios.get('https://jsonplaceholder.typicode.com/users')
                .then((response) => {
                    setAllUsers(response.data)
                })
                .catch(() => console.log("There must be some issue. Data didn't retrieve."), [])
        }
        fetchData()
    }, [])
    useEffect(() => { }, [context.usersData])
    useEffect(() => {
        setAllUsers(allUsers)
    }, [allUsers])
    useEffect(() => {
        setIsLoggedIn(isLogggedIn)
    }, [isLogggedIn])
    allUsers.map((elem) => elem.password = "user")

    const addNewUser = (user) => {
        user.id = allUsers.length + 1
        allUsers.forEach((elem) => {
            if (elem.username === user.username) {
                return toast.error("Username already exists.")
            }
        })
        context.usersData.push(user)
        allUsers.push(user)
        setAllUsers(allUsers)
        return toast.success("User Added")
    }

    const existingUserOrNot = (username, password) => {
        allUsers.forEach(elem => {
            if (elem.username === username && elem.password === password) {
                isLogggedIn.push(elem)
            }
        });
        if (isLogggedIn.length !== 0) {
            toast.success("Logged In")
            navigate('/posts', { state: { isLoggedIn: isLogggedIn, postsData: props.postsData, commentsData: props.commentsData } })
        }
        else {
            toast.error("Wrong username or password")
        }
    }

    return (
        <div>
            <div>
                <HeaderHomePage />
            </div>
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