import React, { useState } from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'
import Footer from './Components/Footer/Footer'

const App = () => {
  const [sidebar, setSidebar] = useState(false)

  return (
    <>
      <Navbar setSidebar={setSidebar} />

      <Routes>
        <Route
          path="/"
          element={<Home sidebar={sidebar} setSidebar={setSidebar} />}
        />
        <Route path="/Video/:categoryId/:videoId" element={<Video />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
