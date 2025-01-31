import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import './Navbar.css'
// import search_icon from '../../assets/images/search-icon.svg'
// import bell_icon from '../../assets/images/bell-icon.svg'
import profile_icon from'../../assets/images/profile-icon.svg'
import drop_icon from'../../assets/images/drop-down.svg'
import hamburger_icon from '../../assets/images/hamburger-menu.svg'
import { logout} from '../../firebase'


function Navbar({user}) {
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  console.log(user);
 
  return (
    <div className="navbar">
      <div className="navbar-left">
        <div 
           onClick={(e) => {
              e.preventDefault();
              navigate('/');
            }}
          className='navbar-logo'>
          <h1>Anime<strong className='pulse'>Pulse</strong>
          </h1>
        </div>
        <ul className={menuOpen ? "open slide-bottom" : ""}>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('/');
              }}
            >
              Home
            </button>
          </li> 
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('/watchlist');
              }}
            >
              My Watchlist
            </button>
          </li>
          <li>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate('/browse');
              }}
            >
              Browse all Anime
            </button>
          </li>
          <li className='mobile'>
            <div className="navbar-profile-mobile">
              
                <p
                  onClick={() => {
                    logout();
                  }}
                  className='pulse'
                >
                  Sign Out
                </p>
              
            </div>
          </li>
        </ul>
      
      </div>
      <div className="navbar-right">
        <div className="navbar-profile">
          <img
            src={profile_icon}
            alt="Human Shaped Icon"
            className="profile"
          />
          <img
            src={drop_icon}
            alt="Downward arrow"
            className="dropdown-arrow"
          />
          
          {user === null ? (
            <div className="dropdown slide-bottom">
            <p
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Sign In/Out
            </p>
          </div>
          ) : (
            <div className="dropdown slide-bottom">
            <p
              onClick={() => {
                logout();
                navigate('/login');
              }}
            >
              Sign In
            </p>
          </div>
          )}

          
        </div>
        <img
            src={hamburger_icon}
            alt="Hamburger Menu Icon"
            className="hamburger-menu"
            onClick={() => setMenuOpen(!menuOpen)}
        />
      </div>
     
    </div>
  );
}


export default Navbar