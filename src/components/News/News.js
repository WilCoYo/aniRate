import React from 'react'
import { useState, useEffect, useCallback } from 'react'
import './News.css'


function News({seasonalAnime}) {

const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);
const [news, setNews] = useState([]);
const [randomNews, setRandomNews] = useState(null);


  
  useEffect(() => {
    if(seasonalAnime?.length > 0) {
      setRandomNews(seasonalAnime[0]); //Not actually random. Easier to just pick first anime on seasonl list and cache
    }
  }, [seasonalAnime]);

// eslint-disable-next-line
  const fetchData = useCallback(async (url) => {
    const response = await fetch(url);
    if(!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`)
    }
    return response.json();
     // eslint-disable-next-line
  })
  
  
  useEffect(() => {
    if(!randomNews) return;

    const fetchNews = async () => {
     
      try{
        setLoading(true)
        setError(null)

        const data = await fetchData(`https://api.jikan.moe/v4/anime/${randomNews.mal_id}/news`);


        setNews(data.data || [])
      } catch(error) {
        console.error('Error fetching news:', error);
        setError(error.message)
      } finally {
        setLoading(false)
      }
    };
    fetchNews();
    // eslint-disable-next-line
  }, [randomNews])

  if(loading) return <p >Fetching Anime News...</p>
  if(error) return <p>Error loading news: {error}</p>

  return (
    <div className='anime-news'>

        <h3>Anime<strong className='pulse'>News</strong></h3>
        {news && news.length > 0 ? (
          <div className='anime-news-list'>
            {news.map((newsItem, index) => (
              <div id='anime-news-list-element' key={index}>
                <img src={newsItem.images.jpg.image_url} alt='Anime poster images'className='anime-news-imgs'/>
                <h4 id='anime-news-title'> 
                  <a href={newsItem.url} target="_blank" rel="noopener noreferrer">
                    {newsItem.title}
                  </a>
                </h4>
                
              </div>
            ))}
          </div>
        ) : (
          <p>No News Available</p>
        )}
    </div>
  )
}

export default News