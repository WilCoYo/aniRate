import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom'
import './Login.css'
import { login, signup } from '../../../firebase';
import loading_gif from '../../images/loading-anime.gif';
import close_icon from '../../images/x-close-symbol.svg';


function Login() {
  const navigate = useNavigate();
  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      if (signState === "Sign In") {
        await login(email, password);
      } else {
        await signup(name, email, password);
      }
      setLoading(false); // Ensure loading stops after successful auth
    } catch (error) {
      console.error("Authentication error:", error);
      setLoading(false);
    }
  };

  const disableWarningMessage = () => {
    const warningElement = document.getElementById('beta-page-warning');
    if(warningElement) {
      warningElement.style.display = 'none';
    } else {
      console.error("Element with ID 'beta-page-warning' not found.")
    }
  }

  return (
    loading?<div className='login-gif'>
      <img src={loading_gif} alt='Anime girl running' />
    </div>:
    <div className='login'>
        <div id='beta-page-warning'>
      
      <div>
        <strong className='pulse beta-title'>Thanks for visiting AniRate!!!</strong><br></br><br></br>
        This site is still in a testing phase so if you see any bugs,<br></br>
        formatting issues, or have suggestions, please let me know!<br></br>
        Enjoy!!
      </div>
      <img
        className='close-icon'
        alt='Closing X icon'
        src={close_icon}
        onClick={() => disableWarningMessage()}
      />
    </div>
      
      <div className='login-form'>
        <div className='login-title'>
          <h1
          onClick={(e) => {
            e.preventDefault();
            navigate('/');
          }}
          >Anime<strong className='text-focus-in'>Pulse</strong></h1>
        </div>
        <h1>{signState}</h1>
        <form>
            {signState === "Sign Up" ? <input value={name} onChange={(e) => {setName(e.target.value)}}  
              type='text' placeholder='Your name' /> : <></>}  
              
            
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} 
              type='email' placeholder='Email' />

            <input value={password} onChange={(e) => {setPassword(e.target.value)}} 
              type='password' placeholder='Password' />


          
          <button onClick={user_auth} type='submit'>{signState}</button>
          <div className='form-help'>
            <div className='remember'>
              <input type='checkbox' />
              <label htmlFor=''>Remember Me</label>
            </div>
            <p>Need Help?</p>
          </div>
        </form>

        <div className='form-switch'>
          {signState === "Sign In" 
          ?<p>New to AnimePulse? <span onClick={() => {setSignState("Sign Up")}}>Sign Up Now</span></p>
          :<p>Already have account? <span onClick={() => {setSignState("Sign In")}}>Sign In Now</span></p>
        }
        </div>
        
      </div>
    </div>
  )
}

export default Login