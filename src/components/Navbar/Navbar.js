import React from 'react'
import './Navbar.css'
import gojo from '../../assets/images/gojo-cat-logo.png'
import search_icon from '../../assets/images/search-icon.svg'
import bell_icon from '../../assets/images/bell-icon.svg'
import profile_icon from'../../assets/images/profile-icon.svg'
import drop_icon from'../../assets/images/drop-down.svg'


function Navbar() {
  return (
    <div className='navbar'>
      <div className="navbar-left">
        <img src={gojo} alt='' className='gojo'/>
        <ul>
          <li>Home</li>
          <li>Tv Shows</li>
          <li>Movies</li>
          <li>New & Popular</li>
          <li>My List</li>
          <li>Browse by Languages</li>
        </ul>
      </div>
      <div className="navbar-right">
        <img src={search_icon} alt='Magnifying Glass Search Icon' className='icons'/>
        {/* <p>Children</p> */}
        <img src={bell_icon} alt='Bell Shaped Icon' className='icons'/>
          <div className="navbar-profile">
            <img src={profile_icon} alt='Human Shaped Icon' className='profile'/>
            <img src={drop_icon} alt='Downward arrow' className="dropdown-arrow"/>
            <div className="dropdown">
              <p>Sign Out</p>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Navbar