import React, { useEffect, useState } from 'react'
import TitleCards from '../../../components/TitleCards/TitleCards';
import Navbar from '../../../components/Navbar/Navbar';
import browse_background from '../../images/browse-background.jpg'
import './Browse.css'



function Browse() {


const [ animeList, setAnimeList] = useState([])
const [error, setError] = useState(null);
const [filter, setFilter] = useState('top');

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(null);







  const fetchAnime = async (url, page = 1) => {
    try {
      const response = await fetch(`${url}&page=${page}`);
      if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`);
      }
      const data = await response.json();
      setAnimeList((prevList) => [...prevList, ...data.data]);
      setTotalPages(data.pagination.last_visible_page);
    } catch (err) {
      setError(err.message);
    }
  };
 
  const baseUrls = {
    top: 'https://api.jikan.moe/v4/anime?q=&type=tv&order_by=score&sort=desc',
    all: 'https://api.jikan.moe/v4/anime?q=&type=tv&order_by=title&sort=asc',
    upcoming: 'https://api.jikan.moe/v4/anime?q=&type=tv&status=upcoming&sort=desc',
  };


  useEffect(() => {
    const url = baseUrls[filter];
    setAnimeList([]); 
    setPage(1); 
    fetchAnime(url, 1); 
    // eslint-disable-next-line
  }, [filter]);


  const handleLoadMore = () => {
    const url = baseUrls[filter];
    const nextPage = page + 1;
    setPage(nextPage);
    fetchAnime(url, nextPage);
  };



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
                  <li onClick={() => setFilter('all')}>All Anime</li>
                  <li onClick={() => setFilter('top')}>Top Rated</li>
                  <li onClick={() => setFilter('upcoming')}>Upcoming</li>
                  <li></li>
                  <li></li>
                </ul>

            </div>

            <div className='results-grid-container'>
              <h1>{filter === 'top' 
                    ? 'Browse Top Anime'
                    : filter === 'all' 
                    ? 'Browse All Anime'
                    : filter === 'upcoming' 
                    ? 'Browse Upcoming Anime'
                    : '' } </h1>
              <div className='results-list'>
                  {animeList.map(
                    (anime) => (
                      anime && anime.mal_id && (
                      <TitleCards key={anime.mal_id} anime={anime} />
                  )
                  ))}
              </div>

              <div className="pagination-controls">
                <button
                  onClick={handleLoadMore}
                  disabled={page >= totalPages} 
                  >
                  {page >= totalPages ? 'No More Results' : 'Load More'}
                </button>
              </div>
                

            </div>


        </div>
    </>
  )
}

export default Browse