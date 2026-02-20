import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Video from './pages/Video/Video'
import Footer from './Components/Footer/Footer'

const App = () => {
  const [sidebar,setSidebar]=useState(true);
  return (
    <div>
      <Navbar setSidebar={setSidebar} />
      <Routes>
        <Route path='/' element={<Home sidebar={sidebar}/>} />
        <Route path='/Video/:categoryId/:videoId' element={<Video />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
