import React from 'react'
import { useState, useEffect } from 'react';
import './Home.css'
import Navbar from '../../../components/Navbar/Navbar'
import hero_banner from '../../images/hero-image.jpg'
import hero_title from '../../images/hero-image-title.png'
import play_icon from '../../images/play-icon.svg'
import info_icon from '../../images/info-icon.svg'
import TitleCards from '../../../components/TitleCards/TitleCards';


function Home() {

  const [topAnime, setTopAnime] = useState([]);

  const GetTopAnime = async () => {
    const temp = await fetch(`https://api.jikan.moe/v4/top/anime?filter=airing&page=1&limit=6`) //switch to airing//
      .then(res => res.json());

    setTopAnime(temp.data.slice(0, 6)); 
  }

  useEffect(() => {
    GetTopAnime();

  }, []);


  return (
    <div className='home'>
      <Navbar/>
        <div className='hero'>
          <img src={hero_banner} alt='' className='banner-img' />
          <div className="hero-caption">
            <img src={hero_title} alt='' className='caption-img'/>
            <p className='caption'>
            Shoyo Hinata is inspired to play volleyball after watching the national championship 
            match and becomes determined to become like the star player, nicknamed "the small giant". 
            Shoyo joins his school's volleyball club, but it has no practice space and only one member. 
            He eventually recruits five other players and competes in a competition, where his team loses 
            to the championship favorite. Shoyo vows to improve and eventually surpass the star player, 
            Kageyama Tobio, who is known as "the king of the court". Shoyo and Kageyama end up becoming 
            teammates in high school.
            </p>
            <div className="hero-btns">
              <button className='btn'><img src={play_icon} alt=''/>Play</button>
              <button className='btn dark-btn'><img src={info_icon} alt=''/>More Info</button>
            </div>
          </div>
        </div>


        <div className="popular-section">
        <h3>Top Anime</h3>
            <div className="card-list">
              {topAnime.map(anime => (
                
                <TitleCards 
                  anime={anime}
                  key={anime.mal_id} 
                />

              ))} 
            </div>
        </div>
    </div>
  )
}

export default Home