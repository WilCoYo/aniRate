import React from 'react'
import './Footer.css'
import youtube_icon from '../../assets/images/youtube_icon.svg'
import facebook_icon from '../../assets/images/facebook_icon.svg'
import instagram_icon from '../../assets/images/instagram_icon.svg'
import twitter_icon from '../../assets/images/twitter_icon.svg'

function Footer() {
  return (
    <div className='footer'>
      <div className='footer-icons'>
        <img src={facebook_icon} alt='Logo for Facebook' />
        <img src={instagram_icon} alt='Logo for Instagram' />
        <img src={twitter_icon} alt='Logo for Twiter' />
        <img src={youtube_icon} alt='Logo for Youtube' />
      </div>

      <ul>
        <li>Blank</li>
        <li>Blank</li>
        <li>Blank</li>
        <li>Blank</li>
        <li>Blank</li>
        <li>Blank</li>
      </ul>
      <p className='copyright-text'>@ Copyright Text</p>
    </div>
  )
}

export default Footer