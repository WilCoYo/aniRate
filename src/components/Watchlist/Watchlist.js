import React from 'react'
import { useState, useEffect} from 'react';
import '../Watchlist/Watchlist.css'
// import { removeFromWatchlist, auth } from '../../firebase'
import { getWatchlistData, auth } from '../../firebase'


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


    const [mondays, setMondays] = useState([]);
    const [tuesdays, setTuesday] = useState([]);
    const [wednesdays, setWednesday] = useState([]);
    const [thursdays, setThursday] = useState([]);
    const [fridays, setFriday] = useState([]);
    const [saturdays, setSaturday] = useState([]);
    const [sundays, setSunday] = useState([]);

    useEffect(() => {
        const mondayAnime = watchlist.filter(anime => 
            anime.broadcast?.day?.toLowerCase() === 'mondays'
        );
        setMondays(mondayAnime);
    }, [watchlist])

    useEffect(() => {
        const tuesdayAnime = watchlist.filter(anime => 
            anime.broadcast?.day?.toLowerCase() === 'tuesdays'
        );
        setTuesday(tuesdayAnime);
    }, [watchlist])

    useEffect(() => {
        const wednesdayAnime = watchlist.filter(anime => 
            anime.broadcast?.day?.toLowerCase() === 'wednesdays'
        );
        setWednesday(wednesdayAnime);
    }, [watchlist])
    
    useEffect(() => {
        const thursdayAnime = watchlist.filter(anime => 
            anime.broadcast?.day?.toLowerCase() === 'thursdays'
        );
        setThursday(thursdayAnime);
    }, [watchlist])

    useEffect(() => {
        const fridayAnime = watchlist.filter(anime => 
            anime.broadcast?.day?.toLowerCase() === 'fridays'
        );
        setFriday(fridayAnime);
    }, [watchlist])

    useEffect(() => {
        const saturdayAnime = watchlist.filter(anime => 
            anime.broadcast?.day?.toLowerCase() === 'saturdays'
        );
        setSaturday(saturdayAnime);
    }, [watchlist])

    useEffect(() => {
        const sundayAnime = watchlist.filter(anime => 
            anime.broadcast?.day?.toLowerCase() === 'sundays'
        );
        setSunday(sundayAnime);
    }, [watchlist])



    




    return (
        <div className='watchlist'>
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
    )
}

export default WeeklyWatchlist