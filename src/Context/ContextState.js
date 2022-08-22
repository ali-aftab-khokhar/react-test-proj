import React from "react";
import ContextAPI from "./ContextAPI";
import useFetch from "../useFetch";

const ContextState = (props) => {
    const [postsData] = useFetch( 'https://jsonplaceholder.typicode.com/posts')
    const [commentsData] = useFetch('https://jsonplaceholder.typicode.com/comments')
    const [usersData] = useFetch('https://jsonplaceholder.typicode.com/users')
    return (
        <ContextAPI.Provider value={ {postsData, commentsData, usersData }}>
            {props.children}
        </ContextAPI.Provider>
    )
}

export default ContextState