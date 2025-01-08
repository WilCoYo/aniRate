import React, {useState, useEffect} from 'react'
import './TodaysWatchlist.css'
import TitleCards from '../TitleCards/TitleCards'




function TodaysWatchlist({ watchlist }) {
    const [currentWeekday, setCurrentWeekday] = useState('');
    const [todaysWatchlist, setTodaysWatchlist] = useState([]);
    const [loading, setLoading] = useState(true);

useEffect(() => {
    
    const dayMapping = {
        'Sunday': 'sunday',
        'Monday': 'monday',
        'Tuesday': 'tuesday',
        'Wednesday': 'wednesday',
        'Thursday': 'thursday',
        'Friday': 'friday',
        'Saturday': 'saturday',
      };

   
    const date = new Date();
    const weekday = date.toLocaleString('en-US', {weekday: 'long'});
    const normalizedWeekday = dayMapping[weekday] || weekday.toLowerCase();
    setCurrentWeekday(normalizedWeekday);
    console.log('Current Weekday:', weekday);
}, [])

useEffect(() => {
  // Filter the watchlist for today's anime
  if (currentWeekday && watchlist) {
    const filteredAnime = watchlist.filter(
      (anime) => anime?.broadcast?.day?.toLowerCase() === currentWeekday
    );
    setTodaysWatchlist(filteredAnime);
    setLoading(false);
  }
}, [currentWeekday, watchlist]);


return (
  <div className="schedule-section">
    <h3>
      <strong className="pulse">Today's</strong> Anime
    </h3>
    {loading ? (
      <p>Loading today's anime...</p>
    ) : todaysWatchlist.length > 0 ? (
      <div className="todays-schedule">
        {todaysWatchlist.map((anime) => (
          anime && anime.mal_id ? <TitleCards key={anime.mal_id} anime={anime} /> : null
        ))}
      </div>
    ) : (
      <p>No anime scheduled for today.</p>
    )}
  </div>
);
}

export default TodaysWatchlist