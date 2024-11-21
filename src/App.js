import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Home from './assets/pages/Home/Home.js'
import Login from './assets/pages/Login/Login.js'
import Watchlist from './assets/pages/Watchlist/Watchlist.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loading_gif from './assets/images/loading-anime.gif';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if(user) {
        console.log("Logged In")
        // Remove this automatic navigation
        // navigate('/')
      } else {
        console.log("Logged Out")
        navigate('/login')
      }
      setLoading(false);
    });
  
    // Cleanup subscription
    return () => unsubscribe();
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
            <Route path='/watchlist' element={<Watchlist />} />
             
        </Routes>
      
    </div>
  )
}

export default App