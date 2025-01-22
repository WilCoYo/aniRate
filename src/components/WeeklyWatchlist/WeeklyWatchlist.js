import React from 'react'
import { useState, useEffect, useRef, useLayoutEffect} from 'react'
import './WeeklyWatchlist.css'


import { getWatchlistData, auth } from '../../firebase'

import TitleCards from '../TitleCards/TitleCards'


function WeeklyWatchlist({onWatchlistUpdate, watchlist: propWatchlist}) {
    const userId = auth.currentUser?.uid;
    const [watchlist, setWatchlist] = useState(propWatchlist || []);

    useEffect(() => {
        setWatchlist(propWatchlist || []);
    }, [propWatchlist]);

    // const handleRemoveToWatchlist = (animeId) => {
    //     if(userId) {
    //         removeFromWatchlist(userId, animeId);
    //         // Update local state and trigger parent component update
    //         const updatedWatchlist = watchlist.filter(anime => anime.mal_id !== animeId);
    //         setWatchlist(updatedWatchlist);
    //     } else {
    //         console.log("User is not authenticated")
    //     }
    // }


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



    const cardsRef = useRef(null);

    useLayoutEffect(() => {
        const weekdays = document.querySelectorAll('.weekday');
    
        const handleWheel = (event) => {
            event.preventDefault();
            event.currentTarget.scrollLeft += event.deltaY; // Scroll horizontally using vertical wheel
        };
    
        weekdays.forEach((weekday) => {
            weekday.addEventListener('wheel', handleWheel, { passive: false });
        });
    
        return () => {
            weekdays.forEach((weekday) => {
                weekday.removeEventListener('wheel', handleWheel);
            });
        };
    }, []);



    const extendWeekday = (weekdayId) => {
        const element = document.getElementById(weekdayId);
        if(element.style.display === 'none'){
            element.style.display = 'flex';
        } else {
            element.style.display = 'none'
        }
    };


    return (
        <>
        <div className='watchlist-dropdown'>
            <h3>Weekly<strong className="pulse"> Watchlist</strong></h3>
            <div className='watchlist' ref={cardsRef}>
                <div id='mondays' className='weekday'>
                    <h2 onClick={() => extendWeekday('mondays-list')}>Monday</h2>
                    {mondays.length > 0 ? (
                        
                            <ul id='mondays-list' className='weekday-list'>
                                {mondays.map((anime, index) => (
                                    <li key={index}>
                                        <TitleCards key={anime.mal_id} anime={anime} />
                                    
                                    </li>
                                    
                                ))}
                            </ul>
                        
                    ) : (
                        <p id='mondays-list' className='weekday-list'>No anime scheduled for Monday.</p>
                    )}
                </div>

                <div id='tuesdays' className='weekday'>
                    <h2 onClick={() => extendWeekday('tuesdays-list')}>Tuesday</h2>
                        {tuesdays.length > 0 ? (
                            
                                <ul id='tuesdays-list' className='weekday-list'>
                                    {tuesdays.map((anime, index) => (
                                        <li key={index}>
                                            <TitleCards key={anime.mal_id} anime={anime} />
                                        
                                        </li>
                                        
                                    ))}
                                </ul>
                            
                        ) : (
                            <p id='tuesdays-list' className='weekday-list'>No anime scheduled for Tuesday.</p>
                        )}
                </div>

                <div id='wednesdays' className='weekday'>
                    <h2 onClick={() => extendWeekday('wednesdays-list')}>Wednesday</h2>
                        {wednesdays.length > 0 ? (
                            
                                <ul id='wednesdays-list' className='weekday-list'>
                                    {wednesdays.map((anime, index) => (
                                        <li key={index}>
                                            <TitleCards key={anime.mal_id} anime={anime} />
                                        
                                        </li>
                                        
                                    ))}
                                </ul>
                            
                        ) : (
                            <p id='wednesdays-list' className='weekday-list'>No anime scheduled for Wednesday.</p>
                        )}
                </div>
                <div id='thursdays' className='weekday'>
                    <h2 onClick={() => extendWeekday('thursdays-list')}>Thursday</h2>
                            {thursdays.length > 0 ? (
                                
                                    <ul id='thursdays-list' className='weekday-list'>
                                        {thursdays.map((anime, index) => (
                                            <li key={index}>
                                                <TitleCards key={anime.mal_id} anime={anime} />
                                            
                                            </li>
                                            
                                        ))}
                                    </ul>
                                
                            ) : (
                                <p id='thursdays-list' className='weekday-list'>No anime scheduled for Thursday.</p>
                            )}
                </div>
                <div id='fridays' className='weekday'>
                    <h2 onClick={() => extendWeekday('fridays-list')}>Friday</h2>
                            {fridays.length > 0 ? (
                                
                                    <ul id='fridays-list' className='weekday-list'>
                                        {fridays.map((anime, index) => (
                                            <li key={index}>
                                                <TitleCards key={anime.mal_id} anime={anime} />
                                            
                                            </li>
                                            
                                        ))}
                                    </ul>
                                
                            ) : (
                                <p id='fridays-list' className='weekday-list'>No anime scheduled for Friday.</p>
                            )}
                </div>
                <div id='saturdays' className='weekday'>
                    <h2 onClick={() => extendWeekday('saturdays-list')}>Saturday</h2>
                            {saturdays.length > 0 ? (
                                
                                    <ul id='saturdays-list' className='weekday-list'>
                                        {saturdays.map((anime, index) => (
                                            <li key={index}>
                                                <TitleCards key={anime.mal_id} anime={anime} />
                                            
                                            </li>
                                            
                                        ))}
                                    </ul>
                                
                            ) : (
                                <p id='saturdays-list' className='weekday-list'>No anime scheduled for Saturday.</p>
                            )}
                </div>
                <div id='sundays' className='weekday'>
                    <h2 onClick={() => extendWeekday('sundays-list')}>Sunday</h2>
                            {sundays.length > 0 ? (
                                
                                    <ul id='sundays-list' className='weekday-list'>
                                        {sundays.map((anime, index) => (
                                            <li key={index}>
                                                <TitleCards key={anime.mal_id} anime={anime} />
                                            
                                            </li>
                                            
                                        ))}
                                    </ul>
                                
                            ) : (
                                <p id='sundays-list' className='weekday-list'>No anime scheduled for Sunday.</p>
                            )}
                </div>
            
           
            </div>
        </div>
        
        </>
    )
    
}

export default WeeklyWatchlist