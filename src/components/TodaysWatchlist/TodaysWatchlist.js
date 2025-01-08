import React, {useState, useEffect, useRef, useLayoutEffect} from 'react'
import './TodaysWatchlist.css'
import TitleCards from '../TitleCards/TitleCards'




function TodaysWatchlist({ watchlist }) {
    const [currentWeekday, setCurrentWeekday] = useState('');
    const [todaysWatchlist, setTodaysWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    
    const dayMapping = {
        'Sunday': 'sundays',
        'Monday': 'mondays',
        'Tuesday': 'tuesdays',
        'Wednesday': 'wednesdays',
        'Thursday': 'thursdays',
        'Friday': 'fridays',
        'Saturday': 'saturdays',
      };

   //Remember 's' at end - need to be the same
    const date = new Date();
    const weekday = date.toLocaleString('en-US', {weekday: 'long'});
    const normalizedWeekday = dayMapping[weekday] || weekday.toLowerCase() + 's';
    setCurrentWeekday(normalizedWeekday);
    console.log('Current Weekday:', normalizedWeekday);
}, [])

useEffect(() => {
  // Filter the watchlist for today's anime
  if (currentWeekday && watchlist) {
    const filteredAnime = watchlist.filter(
      (anime) => anime?.broadcast?.day?.toLowerCase() === currentWeekday
    );
    setTodaysWatchlist(filteredAnime);
    setLoading(false);
    console.log('Todays Watchlist:', todaysWatchlist)
  }
  // eslint-disable-next-line
}, [currentWeekday, watchlist]);



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


useLayoutEffect(() => {
  if (todaysWatchlist.length > 0 && cardsRef.current) {
    const ref = cardsRef.current;

    const handleWheel = (event) => {
      event.preventDefault();
      ref.scrollLeft += event.deltaY;
    };

    ref.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      ref.removeEventListener('wheel', handleWheel);
    };
  }
}, [todaysWatchlist]);


return (
  <div className="schedule-section">
    <h3>
      <strong className="pulse">Today's</strong> Anime
    </h3>
    <div className='schedule-list'>
      {loading ? (
        <p>Loading today's anime...</p>
      ) : todaysWatchlist.length > 0 ? (
        <div className="todays-schedule" ref={cardsRef}>
          {todaysWatchlist.map((anime) => (
            anime && anime.mal_id ? <TitleCards key={anime.mal_id} anime={anime} /> : null
          ))}
        </div>
      ) : (
        <p>No anime scheduled for today.</p>
      )}
    </div>
  </div>
);
}

export default TodaysWatchlist