import React from 'react'
import { useState, useEffect} from 'react'
import './Watchlist.css'
import { removeFromWatchlist } from '../../../firebase'
import { getWatchlistData, auth } from '../../../firebase'
// import drop_icon from '../../../assets/images/drop-down.svg'
// import remove_icon from '../../../assets/images/remove_icon.svg'


function Watchlist({onWatchlistUpdate, watchlist: propWatchlist}) {

  const userId = auth.currentUser?.uid;
  const [watchlist, setWatchlist] = useState(propWatchlist || []);

  useEffect(() => {
      setWatchlist(propWatchlist || []);
  }, [propWatchlist]);

  const handleRemoveToWatchlist = (animeId) => {
      if(userId) {
          removeFromWatchlist(userId, animeId);
          // Update local state and trigger parent component update
          const updatedWatchlist = watchlist.filter(anime => anime.mal_id !== animeId);
          setWatchlist(updatedWatchlist);
      } else {
          console.log("User is not authenticated")
      }
  }


  useEffect(() => {
      const fetchWatchlist = async () => {
        if (userId) {
          try {
            const watchlistIds = await getWatchlistData(userId);
            if (watchlistIds?.length) {
              // Add delay between requests to avoid rate limiting
              const animePromises = watchlistIds.map((id, index) => 
                new Promise(resolve => 
                  setTimeout(() => 
                    fetch(`https://api.jikan.moe/v4/anime/${id}`)
                      .then(res => res.json())
                      .then(data => resolve(data.data))
                      .catch(error => {
                        console.error(`Error fetching anime ${id}:`, error);
                        resolve(null);
                      }), 
                  index * 300 // 300ms delay between requests
                )
              ));
              const animeData = await Promise.all(animePromises);
              // Filter out null values
              setWatchlist(animeData.filter(anime => anime !== null));
            }
          } catch (error) {
            console.error('Error fetching watchlist:', error);
          }
        }
      };
  
      fetchWatchlist();
    }, [userId]);
  

  return (
    <div className="watchlist-container">
    <h1>My Watchlist</h1>
    {watchlist.length === 0 ? (
      <p>Your watchlist is empty</p>
    ) : (
      <div className="watchlist-grid">
        {watchlist.map((anime) => (
          <div key={anime.mal_id} className="watchlist-item">
            <img 
              src={anime.images?.jpg?.image_url} 
              alt={anime.title} 
            />
            <h2>{anime.title}</h2>
            <button 
              onClick={() => handleRemoveToWatchlist(anime.mal_id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    )}
  </div>
  )
}

export default Watchlist