import React, { useEffect, useState } from 'react'

import TitleCards from '../../../components/TitleCards/TitleCards';
import Navbar from '../../../components/Navbar/Navbar';
import browse_background from '../../images/browse-background.webp'
import search_icon from '../../images/search-icon.svg'

import './Browse.css'



function Browse() {


const [ animeList, setAnimeList] = useState([])
const [error, setError] = useState(null);
const [filter, setFilter] = useState('top');

const [page, setPage] = useState(1);
const [totalPages, setTotalPages] = useState(null);


const [searchTerm, setSearchTerm] = useState('');
const [currentSearch, setCurrentSearch] = useState('');

const baseUrls = {
  top: 'https://api.jikan.moe/v4/anime?q=&type=tv&order_by=score&sort=desc',
  all: 'https://api.jikan.moe/v4/anime?q=&type=tv&order_by=title&sort=asc',
  upcoming: 'https://api.jikan.moe/v4/anime?q=&type=tv&status=upcoming&sort=desc',
};




const fetchAnime = async (url, page = 1, search = '') => {
  try {
    const searchQuery = search ? `&q=${encodeURIComponent(search)}` : '';
    const response = await fetch(`${url}${searchQuery}&page=${page}`);
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
 
 

useEffect(() => {
  const url = baseUrls[filter];
  setAnimeList([]); 
  setPage(1); 
  fetchAnime(url, 1, currentSearch); 
  // eslint-disable-next-line
}, [filter, currentSearch]);


const handleSearch = () => {
  setCurrentSearch(searchTerm);
  setAnimeList([]);
  setPage(1);
};

const handleKeyDown = event => {
  if(event.key === 'Enter') {
    handleSearch();
  }
}


const handleLoadMore = () => {
  const url = baseUrls[filter];
  const nextPage = page + 1;
  setPage(nextPage);
  fetchAnime(url, nextPage, currentSearch);
};



if (error) {
  return <div>Error fetching data: {error}</div>;
}







  return (
    <>
    <Navbar />
    <div className='searchBar'>
      <input
        className='animeTextSearch'
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Search for Anime"
      />
      <button
        onClick={handleSearch}
        className='searchBtn'
      >
        <img src={search_icon} alt='magnifying glass' />
      </button>
    </div>
      <img src={browse_background} alt='Anime background' className='browse-background'/>
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