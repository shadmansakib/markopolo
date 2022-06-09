import React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import PrivateOutlet from './components/PrivateOutlet/PrivateOutlet';
import Posts from './routes/Posts/Posts';
import { useSelector } from 'react-redux';
import { AppState } from './store/configStore';
import Login from './routes/Login/Login';
import Toolbar from './components/Toolbar/Toolbar';
import Details from './routes/Details/Details';

function App() {
  const { user } = useSelector((state: AppState) => state.auth)
  
  return (
    <BrowserRouter>
      <Toolbar />
      <main style={{ backgroundColor: '', marginTop: 50 }}>
        <Routes>
          {!user && <Route path='/login' element={<Login />} />}
          <Route path='/' element={user ? <Posts /> : <Login />} />
          <Route path='*' element={<div>404 not found</div>} />

          <Route element={<PrivateOutlet userID={user} />} >
            <Route path='/posts' element={<Posts />} />
            <Route path='/posts/:postID' element={<Details />} />
            <Route path='*' element={<div>404 not found</div>} />
          </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App;
