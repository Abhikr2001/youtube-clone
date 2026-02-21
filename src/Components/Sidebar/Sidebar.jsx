import React from 'react'
import './Sidebar.css'
import home from '../../assets/home.png'
import game_icon from '../../assets/game_icon.png'
import automobiles from '../../assets/automobiles.png'
import sports from '../../assets/sports.png'
import entertainment from '../../assets/entertainment.png'
import tech from '../../assets/tech.png'
import music from '../../assets/music.png'
import blogs from '../../assets/blogs.png'
import news from '../../assets/news.png'
import jack from '../../assets/jack.png'
import simon from '../../assets/simon.png'
import tom from '../../assets/tom.png'
import megan from '../../assets/megan.png'
import cameron from '../../assets/cameron.png'

const Sidebar = ({ sidebar, setSidebar, category, setCategory }) => {
  const isMobile = window.innerWidth <= 900

  const handleCategoryClick = (id) => {
    setCategory(id)
    if (isMobile) setSidebar(false)
  }

  return (
    <>
      {/* Mobile overlay */}
      {sidebar && isMobile && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebar(false)}
        ></div>
      )}

      <div
        className={`
          sidebar
          ${!isMobile && !sidebar ? 'small-sidebar' : ''}
          ${isMobile && sidebar ? 'open' : ''}
        `}
      >
        <div className="shortcut-links">

          <SideLink
            icon={home}
            text="Home"
            active={category === 0}
            onClick={() => handleCategoryClick(0)}
          />

          <SideLink
            icon={game_icon}
            text="Gaming"
            active={category === 20}
            onClick={() => handleCategoryClick(20)}
          />

          <SideLink
            icon={automobiles}
            text="Automobiles"
            active={category === 2}
            onClick={() => handleCategoryClick(2)}
          />

          <SideLink
            icon={sports}
            text="Sports"
            active={category === 17}
            onClick={() => handleCategoryClick(17)}
          />

          <SideLink
            icon={entertainment}
            text="Entertainment"
            active={category === 24}
            onClick={() => handleCategoryClick(24)}
          />

          <SideLink
            icon={tech}
            text="Technology"
            active={category === 28}
            onClick={() => handleCategoryClick(28)}
          />

          <SideLink
            icon={music}
            text="Music"
            active={category === 10}
            onClick={() => handleCategoryClick(10)}
          />

          <SideLink
            icon={blogs}
            text="Blogs"
            active={category === 22}
            onClick={() => handleCategoryClick(22)}
          />

          <SideLink
            icon={news}
            text="News"
            active={category === 25}
            onClick={() => handleCategoryClick(25)}
          />

          <hr />
        </div>

        <div className="subscribed-list">
          <h3>Subscribed</h3>
          <SideLink icon={jack} text="PewDiePie" />
          <SideLink icon={simon} text="MrBeast" />
          <SideLink icon={tom} text="Justin Bieber" />
          <SideLink icon={megan} text="5-Minute Crafts" />
          <SideLink icon={cameron} text="Nas Daily" />
        </div>
      </div>
    </>
  )
}

const SideLink = ({ icon, text, active, onClick }) => (
  <div className={`side-link ${active ? 'active' : ''}`} onClick={onClick}>
    <img src={icon} alt="" />
    <p>{text}</p>
  </div>
)

export default Sidebar
