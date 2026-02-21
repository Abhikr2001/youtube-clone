import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'
import Feed from '../../Components/Feed/Feed'
import React, { useState } from 'react'

const Home = ({ sidebar, setSidebar }) => {
  const [category, setCategory] = useState(0)

  return (
    <div className="home">
      <Sidebar
        sidebar={sidebar}
        setSidebar={setSidebar}
        category={category}
        setCategory={setCategory}
      />

      <div className={`container ${sidebar ? '' : 'large-container'}`}>
        <Feed category={category} />
      </div>
    </div>
  )
}

export default Home
