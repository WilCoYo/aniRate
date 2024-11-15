import React from 'react'
import { useRef } from 'react';
import { useState, useEffect } from 'react';
import './Home.css'

import Navbar from '../../../components/Navbar/Navbar'
import TitleCards from '../../../components/TitleCards/TitleCards';
import Watchlist from '../../../components/Watchlist/Watchlist';
import Footer from '../../../components/Footer/Footer';

import hero_banner from '../../images/hero-image.jpg'
import hero_title from '../../images/hero-image-title.png'
import play_icon from '../../images/play-icon.svg'
import info_icon from '../../images/info-icon.svg'

// import { getWatchlist } from '../../../firebase';
import { getWatchlistData, auth } from '../../../firebase';




function Home( ) {

  const [topAnime, setTopAnime] = useState([]);
  const [watchlist, setWatchlist] = useState([])

  const userId = auth.currentUser?.uid;

  const GetTopAnime = async () => {
    try {
      const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=12&offset=10');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (!data || !data.data) {
        console.error('Invalid API response format:', data);
        return;
      }
  
      // Create a Set to track unique mal_id values
      const uniqueIds = new Set();
  
      // Filter the data to remove duplicates
      const filteredData = data.data.filter(anime => {
        if (!uniqueIds.has(anime.mal_id)) {
          uniqueIds.add(anime.mal_id);
          return true;
        }
        return false;
      });
  
      setTopAnime(filteredData);
    } catch (error) {
      console.error('Error fetching top anime:', error);
    }
  };
  

  

  
    const FetchWatchlist = async () => {
      try {
        if (userId) {
          // Get the array of IDs from Firebase
          const watchlistIds = await getWatchlistData(userId);
          
          if (watchlistIds && watchlistIds.length > 0) {
            // Create an array of promises for all API calls
            const animePromises = watchlistIds.map(id => 
              fetch(`https://api.jikan.moe/v4/anime/${id}`)
                .then(res => res.json())
                .then(data => data.data)
            );
    
            // Wait for all API calls to complete
            const animeData = await Promise.all(animePromises);
            
            // Update state with all fetched anime data
            setWatchlist(animeData);
          }
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
      }
    };
 
  useEffect(() => {
    GetTopAnime();
    FetchWatchlist()

  },  [watchlist]);

 


  const cardsRef = useRef();

  const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(() => {
      const ref = cardsRef.current;
      ref.addEventListener('wheel', handleWheel);
  
      return () => {
          ref.removeEventListener('wheel', handleWheel);
      };
  }, [])

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
            <div className="popular-list" ref={cardsRef}>
              {topAnime.map(anime => (
                
                <TitleCards 
                  anime={anime}
                  key={anime.mal_id} 
                />

              ))} 
            </div> 
            <div className="popular-list" ref={cardsRef}>
              {watchlist.map(anime => (
                
                <Watchlist 
                  anime={anime}
                  key={anime.mal_id} 
                />

              ))} 
            </div> 
            <Footer />
        </div>

        

    </div>
  )
}

export default Home