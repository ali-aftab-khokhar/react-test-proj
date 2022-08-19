import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import ParentComments from './Components/Comments/ParentComments';
import ParentLoginSignUp from './Components/LoginSignUp/ParentLoginSignUp';
import ParentPost from './Components/Posts/ParentPost';
import useFetch from './useFetch';

function App() {
  const [postsData] = useFetch('https://jsonplaceholder.typicode.com/posts')
  const [commentsData] = useFetch('https://jsonplaceholder.typicode.com/comments')
  return (
    <div className="main">
      <Router>
        <Routes>
          <Route exact path='/' element={<ParentLoginSignUp postsData={postsData} commentsData={commentsData} />} />
          <Route exact path='/posts' element={<ParentPost/>} />
          <Route exact path='/posts/:id/comments' element={<ParentComments />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
