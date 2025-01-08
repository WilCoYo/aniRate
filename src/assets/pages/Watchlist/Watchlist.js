import React, { useState, useEffect, useCallback } from 'react';
import './Watchlist.css';
import { removeFromWatchlist, getWatchlistData, auth } from '../../../firebase';
import { onAuthStateChanged } from 'firebase/auth';
import remove_icon from '../../../assets/images/remove_icon.svg';
import watchlist_background from '../../images/haikyuu-budha-background.jpg';
import Navbar from '../../../components/Navbar/Navbar';
import loading_gif from '../../images/loading-anime.gif';
import { toast } from 'react-toastify';

// Cache duration in milliseconds (24 hours)
const CACHE_DURATION = 24 * 60 * 60 * 1000;

function Watchlist({ onWatchlistUpdate }) {
  const [user, setUser] = useState(null);
  const [watchlist, setWatchlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  // eslint-disable-next-line
  const [weeklySchedule, setWeeklySchedule] = useState({
    mondays: [],
    tuesdays: [],
    wednesdays: [],
    thursdays: [],
    fridays: [],
    saturdays: [],
    sundays: []
  });



  const getCachedData = useCallback((userId) => {
    const cached = localStorage.getItem(`watchlsit_${userId}`);
    if(!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > CACHE_DURATION;

    if(isExpired) {
        localStorage.remove.Item(`watchlist_${userId}`);
        return null;
    }

    return data;
  }, []);


  const setCachedData = useCallback((userId, data) => {
    const cacheData = {
        data, 
        timestamp: Date.now()
    };
    localStorage.setItem(`watchlist_${userId}`, JSON.stringify(cacheData));
  }, []);


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


  // Listen for auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (!currentUser) {
        setWatchlist([]);
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);


  // Fetch watchlist data with caching
  useEffect(() => {
    const fetchWatchlist = async () => {
      if (!user) return;

      try {
        setIsLoading(true);
        setError(null);

        // Try to get cached data first
        const cachedWatchlist = getCachedData(user.uid);
        if (cachedWatchlist) {
          setWatchlist(cachedWatchlist);
          setIsLoading(false);
          return;
        }

        // If no cache, fetch from Firebase
        const watchlistIds = await getWatchlistData(user.uid);
        
        if (watchlistIds?.length) {
          const animeDataPromises = watchlistIds.map((id, index) => 
            new Promise(resolve => 
              setTimeout(() => resolve(fetchAnimeData(id)), index * 300)
            )
          );

          const animeData = await Promise.all(animeDataPromises);
          const filteredData = animeData.filter(Boolean);
          
          // Cache the fetched data
          setCachedData(user.uid, filteredData);
          setWatchlist(filteredData);
        } else {
          setWatchlist([]);
        }
      } catch (error) {
        console.error('Error fetching watchlist:', error);
        setError('Failed to load watchlist');
        toast.error('Failed to load watchlist');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWatchlist();
  }, [user, fetchAnimeData, getCachedData, setCachedData]);
        
     
  



  const handleRemoveFromWatchlist = async (animeId) => {
    if (!user) {
      toast.error('Please log in to manage your watchlist');
      return;
    }

    try {
      setIsLoading(true);
      await removeFromWatchlist(user.uid, animeId);
      
      setWatchlist(prev => prev.filter(anime => anime.mal_id !== animeId));
      toast.success('Anime removed from watchlist');
      
      if (onWatchlistUpdate) {
        onWatchlistUpdate(watchlist.filter(anime => anime.mal_id !== animeId));
      }
    } catch (error) {
      console.error('Error removing from watchlist:', error);
      toast.error('Failed to remove anime from watchlist');
    } finally {
      setIsLoading(false);
    }
  };




  return (
    <>
      <Navbar />
      <div className="watchlist-container">
        <img src={watchlist_background} alt="Anime background" className="watchlist-banner-img" />
        <div className="watchlist-preview-scroll">
          <div className="watchlist-preview-header">
            <h1>My Watchlist</h1>
          </div>

          {!user ? (
            <p>Please log in to view your watchlist</p>
          ) : isLoading ? (
            <div className="watchlist-grid">
              <img src={loading_gif} alt="Loading..." />
            </div>
          ) : error ? (
            <p className="error-message">{error}</p>
          ) : watchlist.length === 0 ? (
            <p>Your watchlist is empty</p>
          ) : (
            <div className="watchlist-grid">
              {watchlist.map((anime) => (
                <div key={anime.mal_id} className="watchlist-item">
                  <img src={anime.images?.jpg?.image_url} alt={anime.title} />
                  <h2>{anime.title_english || anime.title}</h2>
                  <img
                    src={remove_icon}
                    alt="Remove"
                    className="remove"
                    onClick={() => handleRemoveFromWatchlist(anime.mal_id)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Weekly schedule section remains the same */}
      </div>
    </>
  );
}

export default Watchlist;