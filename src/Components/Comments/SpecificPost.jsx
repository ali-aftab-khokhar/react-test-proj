// import axios from 'axios'
// import React, { useEffect } from 'react'

// const SpecificPost = (props) => {
//     console.log(props.post)
//     useEffect(() => {
//         const fetchData = async () => {
//             await axios.get('https://jsonplaceholder.typicode.com/posts/' + props.post.id + '/comments/')
//                 .then((response) => {
//                     setAllComments(response.data)
//                 })
//                 .catch(() => console.log("There must be some issue. Data didn't retrieve."), [])
//         }
//         fetchData()
//     }, [])
//     return (
//         <div>
//             <div className="card mb-3">
//                 <h1 className='p-3'>Post</h1>
//                 <div className="card-body">
//                     <h5 className="card-title">{props.post.title}</h5>
//                     <p className="card-text">{props.post.body}</p>
//                     {/* { */}
//                         {/* props.allComments.length > 0 ? */}
//                             {/* <div> */}
//                                 {/* {
//                                     props.allComments.map((elem) => {
//                                         return (<p>{elem.name}</p>)
//                                     })
//                                 } */}
//                             {/* </div>
//                             : <div> Loading... </div> */}
//                     {/* } */}
//                 </div>

//             </div>
//         </div>
//     )
// }

// export default SpecificPost