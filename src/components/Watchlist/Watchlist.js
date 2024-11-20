import React from 'react'
import { useState, useEffect} from 'react';
import '../Watchlist/Watchlist.css'
import '../Navbar/Navbar.css'
// import { removeFromWatchlist, auth } from '../../firebase'
import { getWatchlistData, auth } from '../../firebase'
import drop_icon from '../../assets/images/drop-down.svg'


function WeeklyWatchlist({anime}) {
    const userId = auth.currentUser?.uid;
    
 

    // const handleRemoveToWatchlist = () => {
    //     if(userId) {
    //         removeFromWatchlist(userId, anime.mal_id);
    //     } else {
    //         console.log("User is not authenticated")
    //     }
        
    // }

    const [watchlist, setWatchlist] = useState([]);


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



    // if (isLoading) {
    //     return (
    //         <div className='watchlist-loading'>
    //             <h2>Loading Your Weekly Watchlist...</h2>
    //             <p>Fetching your anime schedule...</p>
    //             <img src={loading_gif} alt='Anime girl running' />
    //         </div>
    //     );
    // }




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