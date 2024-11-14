import React, { useEffect, useState } from 'react'
import Home from './assets/pages/Home/Home.js'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Login from './assets/pages/Login/Login.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loading_gif from './assets/images/loading-anime.gif';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if(user) {
        console.log("Logged In")
        navigate('/')
      } else {
        console.log("Logged Out")
        navigate('/login')
      }
      setLoading(false);
    });
  }, [navigate])

  

  return (
    loading?<div className='login-gif'>
    <img src={loading_gif} alt='Anime girl running' />
    </div>:
    <div>
        <ToastContainer theme='dark' />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
             
        </Routes>
      
    </div>
  )
}

export default App