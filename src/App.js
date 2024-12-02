import React, { useEffect, useState } from 'react'
import { Routes, Route, useNavigate} from 'react-router-dom'
import Home from './assets/pages/Home/Home.js'
import Login from './assets/pages/Login/Login.js'
import Watchlist from './assets/pages/Watchlist/Watchlist.js'
import Browse from './assets/pages/Browse/Browse.js'
import Info from './assets/pages/Info/Info.js'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase.js'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import loading_gif from './assets/images/loading-anime.gif';

function App() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setLoading(false); // Mark loading as done
      const currentPath = window.location.pathname;
  
      if (user) {
        console.log('Logged In');
        // Only redirect to '/' if the current path is '/login'
        if (currentPath === '/login') {
          navigate('/');
        }
      } else {
        console.log('Logged Out');
        // Redirect to '/login' unless already there
        if (currentPath !== '/login') {
          navigate('/login');
        }
      }
    });
  
    return () => unsubscribe();
  }, [navigate]);


  return (
    loading?
    <div className='login-gif'>
    <img src={loading_gif} alt='Anime girl running' />
    </div>:
    <div>
        <ToastContainer theme='dark' />
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
            <Route path='/watchlist' element={<Watchlist />} />
            <Route path='/browse' element={<Browse />} />
            <Route path='/info' element={<Info />} />
            
        </Routes>
      
    </div>
  )
}

export default App