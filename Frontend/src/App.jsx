import Left from './Components/Left.jsx'
import Right from './Components/Right.jsx'
import React from 'react'
import {Routes,Route,Navigate} from 'react-router-dom'
import Loginpage from './pages/Loginpage.jsx'
import Homepage from './pages/Homepage.jsx'
import Profilepage from './pages/Profilepage.jsx'
import Signuppage from './pages/Signuppage.jsx'
import './App.css'
function App() {
 

  return (
    <div div style={{display:"flex", height:"100vh", width:"100vw",overflow:"hidden"}}>
    {/* <Left/> */}
    {/* <Right/> */}
    <Routes>
      <Route path='/' element={<Navigate to="/login"/>}/>
      <Route path='/login' element={<Loginpage/>}/>
      <Route path='/home' element={<Right/>}/>
      <Route path='/profile' element={<Profilepage/>}/>
      <Route path='/signup' element={<Signuppage/>}/>
    </Routes>
    </div>
  )
}

export default App
