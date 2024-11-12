import React from 'react'
import Home from './assets/pages/Home/Home.js'
import { Routes, Route} from 'react-router-dom'
import Login from './assets/pages/Login/Login.js'

function App() {



  return (
    <div>
        <Routes>
            <Route path='/' element={<Home/>} />
            <Route path='/login' element={<Login />} />
             
        </Routes>
      
    </div>
  )
}

export default App