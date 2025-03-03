import React, { useState, useEffect, useCallback } from 'react';
import './Home.css';
import { auth, getWatchlistData } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import Navbar from '../../../components/Navbar/Navbar';

import SeasonalAnime from '../../../components/SeasonalAnime/SeasonalAnime';

import hero_banner from '../../images/hero-image-3.jpg';

import WeeklyWatchlist from '../../../components/WeeklyWatchlist/WeeklyWatchlist';




function Home({anime} ) {

const [seasonalAnime, setSeasonalAnime] = useState([]);
const [watchlist, setWatchlist] = useState([])
const [loading, setLoading] = useState(true)
const [error, setError] = useState(null)
const [user, setUser] = useState(null)


  // Cache management functions (reuse from Watchlist component)
  const getCachedData = useCallback((userId) => {
    const cached = localStorage.getItem(`watchlist_${userId}`);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > 24 * 60 * 60 * 1000;

    if (isExpired) {
      localStorage.removeItem(`watchlist_${userId}`);
      return null;
    }

    return data;
  }, [])

const fetchAnimeData = useCallback(async (id) => {
  try {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${id}`);
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(`Error fetching anime ${id}:`, error);
    return null;
  }
}, []);


// Authentication listener
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    if (!currentUser) {
      setWatchlist([]);
    }
  });

  return () => unsubscribe();
}, []);




useEffect(() => {
  const fetchWatchlist =  async () => {
    if(!user) {
      if(seasonalAnime.length > 0) {
        setWatchlist(seasonalAnime);
        setLoading(false);
      }
      return;
    }





    try {
      //Try to get cached data first
      const cachedWatchlist = getCachedData(user.uid);
      if(cachedWatchlist) {
        setWatchlist(cachedWatchlist);
        setLoading(false);
        console.log('Cached Watchlist:', cachedWatchlist);
        return;
      }

      const watchlistIds = await getWatchlistData(user.uid);

      if(watchlistIds?.length) {
        const animeDataPromises = watchlistIds.map((id, index) =>
        new Promise(resolve =>
          setTimeout(() => resolve(fetchAnimeData(id)), index * 300)
        )
      );

      const animeData = await Promise.all(animeDataPromises);
      const filteredData = animeData.filter(Boolean);
      setWatchlist(filteredData);
      console.log('Filtered Watchlist:', filteredData)

       // Cache the fetched data
       localStorage.setItem(`watchlist_${user.uid}`, JSON.stringify({
        data: filteredData,
        timestamp: Date.now()
      }));

      }
    } catch (error) {
      console.error('Error fetching watchlist:', error);
      setError('Failed to load watchlist');
    } finally {
      setLoading(false);
    }
  };

  fetchWatchlist();
}, [user, seasonalAnime, fetchAnimeData, getCachedData])




  // Fetch Seasonal Anime from cache
  useEffect(() => {
    const fetchSeasonalAnime = async () => {
      try {
        setLoading(true)
        const response = await fetch('https://api.jikan.moe/v4/seasons/2025/winter'); 
        if(!response.ok){
          throw new Error(`API Error: ${response.status} ${response.statusText}`)
        }
        const data = await response.json();

        const uniqueAnime = data.data.filter((anime, index, self) => 
          index === self.findIndex((t) => t.mal_id === anime.mal_id)
        );

        console.log('Fetched anime data:', uniqueAnime); // Debug log
        setSeasonalAnime(uniqueAnime);
      } catch (error) {
        console.error('Error fetching seasonal anime:', error);
      } finally {
        setLoading(false)
      }
    };
  
    fetchSeasonalAnime();
  }, []);





return (
  <div className='home'>
    
    <img src={hero_banner} alt='' className='banner-img' />

    <Navbar user={user} />
    
    <div className='home-top-row'>
      {/* <News seasonalAnime={seasonalAnime}/> */}
      {/* <TodaysWatchlist watchlist={watchlist} loading={loading} error={error} /> */}
      <WeeklyWatchlist watchlist={watchlist} loading={loading} error={error} user={user} />
    </div>
    
    <SeasonalAnime  seasonalAnime={seasonalAnime}/>

  </div>
);
}

export default Home