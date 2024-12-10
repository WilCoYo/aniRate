import React from 'react'
import { useRef, useState, useEffect, useLayoutEffect} from 'react';


import './Home.css'

import Navbar from '../../../components/Navbar/Navbar'
import TitleCards from '../../../components/TitleCards/TitleCards';
import WeeklyWatchlist from '../../../components/WeeklyWatchlist/WeeklyWatchlist'
// import Footer from '../../../components/Footer/Footer'


import hero_banner from '../../images/hero-image.jpg'
import hero_title from '../../images/hero-image-title.png'

import info_icon from '../../images/info-icon.svg'

// import { getWatchlist } from '../../../firebase';





function Home({anime, onWatchlistUpdate} ) {
  const [topAnime, setTopAnime] = useState([]);
  const [watchlist, setWatchlist] = useState([]); 
 
  // const userId = auth.currentUser?.uid;

  // Fetch Top Anime on initial render
  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=12&offset=10');
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        const uniqueAnime = data.data.filter((anime, index, self) => 
          index === self.findIndex((t) => t.mal_id === anime.mal_id)
        );
        console.log('Fetched anime data:', uniqueAnime); // Debug log
        setTopAnime(uniqueAnime);
      } catch (error) {
        console.error('Error fetching top anime:', error);
      }
    };
  
    fetchTopAnime();
  }, []);
 


const cardsRef = useRef(null);


useLayoutEffect(() => {
  const ref = cardsRef.current;
  console.log('Ref assigned:', ref); // Should now log the DOM node

  const handleWheel = (event) => {
    if (ref) {
      event.preventDefault();
      ref.scrollLeft += event.deltaY;
    }
  };

  if (ref) {
    ref.addEventListener('wheel', handleWheel, { passive: false });
  }

  return () => {
    if (ref) ref.removeEventListener('wheel', handleWheel);
  };
}, []);

useEffect(() => {
  if (topAnime.length > 0 && cardsRef.current) {
    const ref = cardsRef.current;
    console.log('Ref assigned:', ref); // Should now log the DOM node

    const handleWheel = (event) => {
      event.preventDefault();
      ref.scrollLeft += event.deltaY;
    };

    ref.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      ref.removeEventListener('wheel', handleWheel);
    };
  }
}, [topAnime, cardsRef]);


const handleWatchlistUpdate = (anime) => {
  setWatchlist(prevWatchlist => {
    // Check if anime is already in watchlist to prevent duplicates
    const isAlreadyInWatchlist = prevWatchlist.some(item => item.mal_id === anime.mal_id);
    return isAlreadyInWatchlist 
      ? prevWatchlist 
      : [...prevWatchlist, anime];
  });
}



  return (
    <div className='home'>
      <Navbar/>
      <WeeklyWatchlist 
        onWatchlistUpdate={handleWatchlistUpdate} 
        watchlist={watchlist}
      />
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
              <button className='btn dark-btn'><img src={info_icon} alt=''/>
                More Info
              </button>
            </div>
          </div>
          
        </div>
        


        <div className="popular-section">
          <h3>Popular Airing Anime</h3> 
          {topAnime.length > 0 ? (
        <div className="popular-list" ref={cardsRef}>
          {topAnime.map((anime) => (
            anime && anime.mal_id ? (
              <TitleCards 
                key={anime.mal_id}
                anime={anime} 
                onWatchlistUpdate={handleWatchlistUpdate}
              />
            ) : null
          ))}
        </div>
          ) : (
            <p>Loading top anime...</p>
          )}
            {/* <Footer /> */}
        </div>

        

    </div>
  )
}

export default Home