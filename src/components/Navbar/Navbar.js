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

  const sendEmailButton = () => { 
    window.location.href = `mailto:wilcoyonkin@gmail.com?subject='AniRate Support Ticket'&body=Body`;
    
  }

 
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
          <li className='support mobile'>
            <button
              onClick={() => sendEmailButton()}
            >
              Support
            </button>
          </li>
          
          <li className='mobile'>
              {!user || user === null ? (
                <div className="navbar-profile-mobile">
              
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    navigate('/login');
                  }}
                  className='pulse'
                >
                  Sign In
                </p>
              
            </div>

              ) : (
                <div className="navbar-profile-mobile">
                  
              
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    logout().then(() => navigate('/login'));
                  }}
                  className='pulse'
                >
                  Sign Out
                </p>
              
            </div>
              )} 

            
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
          
          {user === null || !user ? (
            <div className="dropdown slide-bottom">
            <p
              onClick={(e) => {
                e.preventDefault();
                navigate('/login');
              }}
            >
              Sign In
            </p>
          </div>
          ) : (
            <div className="dropdown slide-bottom">
            <p className='support'>
              <button
                onClick={() => sendEmailButton()}
              >
                Support
              </button>
            </p>
            <p
              onClick={(e) => {
                e.preventDefault();
                logout().then(() => navigate('/login'));
              }}
              
            >
              Sign Out
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