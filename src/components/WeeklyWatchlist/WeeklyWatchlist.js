import React from 'react'
import { useState, useEffect} from 'react'
import './WeeklyWatchlist.css'
import '../Navbar/Navbar.css'
import { removeFromWatchlist } from '../../firebase'
import { getWatchlistData, auth } from '../../firebase'
import drop_icon from '../../assets/images/drop-down.svg'
import remove_icon from '../../assets/images/remove_icon.svg'


function WeeklyWatchlist({onWatchlistUpdate, watchlist: propWatchlist}) {
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
    
 

    const [mondays, setMondays] = useState([]);
    const [tuesdays, setTuesday] = useState([]);
    const [wednesdays, setWednesday] = useState([]);
    const [thursdays, setThursday] = useState([]);
    const [fridays, setFriday] = useState([]);
    const [saturdays, setSaturday] = useState([]);
    const [sundays, setSunday] = useState([]);

    useEffect(() => {
        const mondayAnime = (watchlist || []).filter(anime => 
            anime?.broadcast?.day?.toLowerCase() === 'mondays'
        );
        setMondays(mondayAnime);
    }, [watchlist])

    useEffect(() => {
        const tuesdayAnime = (watchlist || []).filter(anime => 
            anime?.broadcast?.day?.toLowerCase() === 'tuesdays'
        );
        setTuesday(tuesdayAnime);
    }, [watchlist])

    useEffect(() => {
        console.log('Watchlist:', watchlist);
        const wednesdayAnime = (watchlist || []).filter(anime => {
            console.log('Anime broadcast:', anime?.broadcast.day);
            return anime?.broadcast?.day?.toLowerCase() === 'wednesdays'
        });
        setWednesday(wednesdayAnime);
    }, [watchlist])
    
    useEffect(() => {
        const thursdayAnime = (watchlist || []).filter(anime => 
            anime?.broadcast?.day?.toLowerCase() === 'thursdays'
        );
        setThursday(thursdayAnime);
    }, [watchlist])

    useEffect(() => {
        const fridayAnime = (watchlist || []).filter(anime => 
            anime?.broadcast?.day?.toLowerCase() === 'fridays'
        );
        setFriday(fridayAnime);
    }, [watchlist])

    useEffect(() => {
        const saturdayAnime = (watchlist || []).filter(anime => 
            anime?.broadcast?.day?.toLowerCase() === 'saturdays'
        );
        setSaturday(saturdayAnime);
    }, [watchlist])

    useEffect(() => {
        const sundayAnime = (watchlist || []).filter(anime => 
            anime?.broadcast?.day?.toLowerCase() === 'sundays'
        );
        setSunday(sundayAnime);
    }, [watchlist])



 



    return (
        <>
        <div className='watchlist-dropdown'>
            <p>Watchlist</p>
            <img src={drop_icon} alt='Downward arrow' className="dropdown-arrow"/>

            <div className='watchlist slide-bottom '>
           
            <h2>Weekly Watchlist</h2>
            <div id='mondays' className='weekday'>
                <h3>Monday</h3>
                {mondays.length > 0 ? (
                    <ul>
                        {mondays.map((anime, index) => (
                            <li key={index}>
                                {anime.title_english || anime.title}
                                <img 
                                    src={remove_icon} 
                                    alt='Remove Icon' 
                                    className='remove'
                                    onClick={() => handleRemoveToWatchlist(anime.mal_id)}
                                />
                            </li>
                            
                        ))}
                    </ul>
                ) : (
                    <p>No anime scheduled this day</p>
                )}
            </div>

            <div id='tuesdays' className='weekday'>
                <h3>Tuesday</h3>
                {tuesdays.length > 0 ? (
                    <ul>
                        {tuesdays.map((anime, index) => (
                            <li key={index}>
                                {anime.title_english || anime.title}
                                <img 
                                    src={remove_icon} 
                                    alt='Remove Icon' 
                                    className='remove'
                                    onClick={() => handleRemoveToWatchlist(anime.mal_id)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No anime scheduled this day</p>
                )}
            </div>

            <div id='wednesdays' className='weekday'>
                <h3>Wednesday</h3>
                {wednesdays.length > 0 ? (
                    <ul>
                        {wednesdays.map((anime, index) => (
                            <li key={index}>
                                {anime.title_english || anime.title}
                                <img 
                                    src={remove_icon} 
                                    alt='Remove Icon' 
                                    className='remove'
                                    onClick={() => handleRemoveToWatchlist(anime.mal_id)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No anime scheduled this day</p>
                )}
            </div>
            <div id='thursdays' className='weekday'>
                <h3>Thursday</h3>
                {thursdays.length > 0 ? (
                    <ul>
                        {thursdays.map((anime, index) => (
                            <li key={index}>
                                {anime.title_english || anime.title}
                                <img 
                                    src={remove_icon} 
                                    alt='Remove Icon' 
                                    className='remove'
                                    onClick={() => handleRemoveToWatchlist(anime.mal_id)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No anime scheduled this day</p>
                )}
            </div>
            <div id='fridays' className='weekday'>
                <h3>Friday</h3>
                {fridays.length > 0 ? (
                    <ul>
                        {fridays.map((anime, index) => (
                            <li key={index}>
                                {anime.title_english || anime.title}
                                <img 
                                    src={remove_icon} 
                                    alt='Remove Icon' 
                                    className='remove'
                                    onClick={() => handleRemoveToWatchlist(anime.mal_id)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No anime scheduled this day</p>
                )}
            </div>
            <div id='saturdays' className='weekday'>
                <h3>Saturday</h3>
                {saturdays.length > 0 ? (
                    <ul>
                        {saturdays.map((anime, index) => (
                            <li key={index}>
                                {anime.title_english || anime.title}
                                <img 
                                    src={remove_icon} 
                                    alt='Remove Icon' 
                                    className='remove'
                                    onClick={() => handleRemoveToWatchlist(anime.mal_id)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No anime scheduled this day</p>
                )}
            </div>
            <div id='sundays' className='weekday'>
                <h3>Sunday</h3>
                {sundays.length > 0 ? (
                    <ul>
                        {sundays.map((anime, index) => (
                            <li key={index}>
                                {anime.title_english || anime.title}
                                <img 
                                    src={remove_icon} 
                                    alt='Remove Icon' 
                                    className='remove'
                                    onClick={() => handleRemoveToWatchlist(anime.mal_id)}
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No anime scheduled this day</p>
                )}
            </div>
            
           




           
        </div>
        </div>
        
        </>
    )
    
}

export default WeeklyWatchlist