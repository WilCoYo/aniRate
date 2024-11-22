import React, { useEffect, useState } from 'react'
import TitleCards from '../../../components/TitleCards/TitleCards';
import Navbar from '../../../components/Navbar/Navbar';
import browse_background from '../../images/browse-background.jpg'
import './Browse.css'



function Browse() {


const [ animeList, setAnimeList] = useState([])
const [error, setError] = useState(null);



useEffect(() => {
    const fetchTopAnime = async () => {
      try {
        const response = await fetch('https://api.jikan.moe/v4/top/anime?filter=airing&limit=24');
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setAnimeList(data.data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchTopAnime();
  }, []);

  if (error) {
    return <div>Error fetching data: {error}</div>;
  }



  return (
    <>
    <Navbar />
    <img src={browse_background} alt='Cat with bandana' className='browse-background'/>
        <div className='browse-component'>
            

            <div className='filter-searchbar'>
                <ul className='filter-searchbar-list'>
                    <li>All Anime</li> {/* Change to button with onClick */}
                    <li>Top Rated</li>
                    <li>Upcoming</li>
                    <li></li>
                    <li></li>
                </ul>

            </div>

            <div className='results-grid-container'>
                <h1>Browse Top Anime</h1>
                <div className='results-list'>
                    {animeList.map((anime) => (
                        anime && anime.mal_id ? (
                        <TitleCards 
                        key={anime.mal_id}
                        anime={anime}
                    />
                    ) : null
                    ))}
                </div>
                

            </div>


        </div>
    </>
  )
}

export default Browse