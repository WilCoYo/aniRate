import React from 'react'
import { useRef, useState, useEffect} from 'react';

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
  const [watchlist, setWatchlist] = useState([]);
  const userId = auth.currentUser?.uid;

  // Fetch Top Anime on initial render
  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=12&offset=10');
        const data = await response.json();
        const uniqueAnime = data.data.filter((anime, index, self) => 
          index === self.findIndex((t) => t.mal_id === anime.mal_id)
        );
        setTopAnime(uniqueAnime);
      } catch (error) {
        console.error('Error fetching top anime:', error);
      }
    };

    fetchTopAnime();
  }, []);

  // Fetch Watchlist when userId changes or watchlist is modified
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (userId) {
        try {
          const watchlistIds = await getWatchlistData(userId);
          if (watchlistIds?.length) {
            const animePromises = watchlistIds.map(id => 
              fetch(`https://api.jikan.moe/v4/anime/${id}`).then(res => res.json())
            );
            const animeData = await Promise.all(animePromises);
            setWatchlist(animeData.map(res => res.data));
          }
        } catch (error) {
          console.error('Error fetching watchlist:', error);
        }
      }
    };

    fetchWatchlist();
  }, [userId, watchlist]);


  const cardsRef = useRef();

  const handleWheel = (event) => {
      event.preventDefault();
      cardsRef.current.scrollLeft += event.deltaY;
  }
  
  useEffect(() => {
      const ref = cardsRef.current;
      if(ref) {
        ref.addEventListener('wheel', handleWheel);

        return () => {
          ref.removeEventListener('wheel', handleWheel);
      };
    }
  }, [cardsRef])

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
          {topAnime.length > 0 ? (
            <div className="popular-list" ref={cardsRef}>
              {topAnime.map(anime => (
                anime && anime.mal_id ? (
                  <TitleCards 
                    key={anime.mal_id}
                    anime={anime} 
                  />
                ) : null
              ))}
            </div>
          ) : (
            <p>No top anime found</p>
          )}

          {watchlist.length > 0 ? (
            <div className="popular-list" ref={cardsRef}>
              {watchlist.map(anime => (
                anime && anime.mal_id ? (
                  <Watchlist 
                    key={anime.mal_id}
                    anime={anime} 
                  />
                ) : null
              ))}
            </div>
          ) : (
            <p>No watchlist anime found</p>
          )}
            <Footer />
        </div>

        

    </div>
  )
}

export default Home