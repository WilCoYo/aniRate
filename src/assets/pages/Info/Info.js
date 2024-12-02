import React from 'react'
import { useLocation } from 'react-router-dom';

import Navbar from '../../../components/Navbar/Navbar';

import './Info.css'
import add_icon from '../../images/add-icon.svg'

import { addToWatchlist, auth} from '../../../firebase'

function Info({onWatchlistUpdate}) {
    const userId = auth.currentUser?.uid;
    const location = useLocation();
    const { anime } = location.state || {};


    if (!anime) {
        return <div>Anime information not found.</div>;
    }



    const handleAddToWatchlist = () => {
        if(userId) {
            addToWatchlist(userId, anime.mal_id);
            if (onWatchlistUpdate) {
                onWatchlistUpdate(anime);
            }
        } else {
            console.log("User is not authenticated")
        }
        
    }


return (
<>
<Navbar />
<div className='info-section'>
    
    <div className='anime'>
    
        <div className='anime-image'>
            <img 
                src={anime.images.jpg.image_url} 
                alt='Anime Cover Art'
            />
            <div className='image-sidebar-info'>
                <button className='add-btn'
                        onClick={handleAddToWatchlist}
                >
                    <img src={add_icon} alt=''/>Add to watchlist
                </button>
                <ul>
                    <li>Rating: {anime.score}</li>
                    <li>Status: {anime.status}</li>
                    <li>Episodes: {anime.episodes}</li>
                    <li>Aired from: {anime.aired.string}</li>
                    
                    <li>Genres: {anime.genres.map((genre) => genre.name).join(', ')}</li> {/* pulling from array in API */}
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>
        <div className='anime-info'>
            <h1>{anime.title_english || anime.title_japanese}</h1>
            
            <p>{anime.synopsis}</p>
        </div>

    </div>
    
</div>
</>
  )
}

export default Info