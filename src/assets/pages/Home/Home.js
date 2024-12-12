import React from 'react'
import { useRef, useState, useEffect, useLayoutEffect} from 'react';


import './Home.css'

import Navbar from '../../../components/Navbar/Navbar'
import TitleCards from '../../../components/TitleCards/TitleCards';



import hero_banner from '../../images/hero-image.jpg'








function Home({anime, onWatchlistUpdate} ) {
  const [topAnime, setTopAnime] = useState([]);

  const [randomNews, setRandomNews] = useState([]);
  const [newsData, setNewsData] = useState([]);
  // const [watchlist, setWatchlist] = useState([]); 
 
  // const userId = auth.currentUser?.uid;

  // Fetch Top Anime on initial render
  useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/seasons/2024/fall'); //Seasonal even though it says 'top'
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


// const handleWatchlistUpdate = (anime) => {
//   setWatchlist(prevWatchlist => {
//     // Check if anime is already in watchlist to prevent duplicates
//     const isAlreadyInWatchlist = prevWatchlist.some(item => item.mal_id === anime.mal_id);
//     return isAlreadyInWatchlist 
//       ? prevWatchlist 
//       : [...prevWatchlist, anime];
//   });
// }



const getRandomNews = (topAnime) => {
  if(!topAnime.length) return '';
  const randomIndex = Math.floor(Math.random() * topAnime.length);
  const randomTopAnime = topAnime[randomIndex];
  return `https://api.jikan.moe/v4/anime/${randomTopAnime.mal_id}/news`;
 
};

useEffect(() => {
  if(topAnime.length > 0) {
    setRandomNews(getRandomNews(topAnime));
  }
}, [topAnime]);


useEffect(() => {
  const fetchNews = async () => {
    if(!randomNews) return;

    try{
      const response = await fetch(randomNews);
      if(!response.ok) {
        throw new Error(`Failed to fetch news: ${response.statusText}`)
      }
      const data = await response.json();
      console.log('Fetched news data:', data);
      setNewsData(data.data);
    } catch(error) {
      console.error('Error fetching news:', error);
      setNewsData(null);
    }
  };
  fetchNews();
}, [randomNews])

return (
  <div className='home'>
    <Navbar />
    <div className='hero'>
      <img src={hero_banner} alt='' className='banner-img' />
      <div className='anime-news'>
        <h3>Anime<strong className='pulse'>News</strong></h3>
        {newsData && newsData.length > 0 ? (
          <div className='anime-news-list'>
            {newsData.map((news, index) => (
              <div id='anime-news-list-element'>
                <img src={news.images.jpg.image_url} alt='Anime poster images'className='anime-news-imgs'/>
                <h4 key={index} id='anime-news-title'> 
                  <a href={news.url} target="_blank" rel="noopener noreferrer">
                    {news.title}
                  </a>
                </h4>
                
              </div>
            ))}
          </div>
        ) : (
          <p>Fetching anime news...</p>
        )}
      </div>
      <div className="popular-section">
        <h3><strong className='pulse'>Fall</strong>Anime</h3>
        {topAnime.length > 0 ? (
          <div className="popular-list" ref={cardsRef}>
            {topAnime.map((anime) => (
              anime && anime.mal_id ? (
                <TitleCards key={anime.mal_id} anime={anime} />
              ) : null
            ))}
          </div>
        ) : (
          <p>Loading top anime...</p>
        )}
      </div>
    </div>
  </div>
);
}

export default Home