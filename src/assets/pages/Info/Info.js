import React from 'react'
import { useLocation } from 'react-router-dom';
import Navbar from '../../../components/Navbar/Navbar';

import './Info.css'
import add_icon from '../../images/add-icon.svg'
import info_background from '../../images/info-background.jpg'

import { addToWatchlist, auth} from '../../../firebase'

import { toast } from 'react-toastify';

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
            toast.success('Anime added to watchlist');
            if (onWatchlistUpdate) {
                onWatchlistUpdate(anime);
            }
        } else {
            console.log("User is not authenticated")
            toast.error('Failed to add to watchlist');
        }
        
    }


    



return (
<>
<Navbar />
<img src={info_background} alt='kakashi reading' className='info-background'/>
<div className='info-section'>
    
    <div className='anime'>
    
        <div className='anime-details-top'>
            <div className='anime-image'>
                <img 
                    src={anime.images.jpg.image_url} 
                    alt='Anime Cover Art'
                />
            </div>
            <div className='image-sidebar-info'>
                <button className='add-btn'
                        onClick={handleAddToWatchlist}
                >
                    <img src={add_icon} alt=''/>Add to watchlist
                </button>
                <ul>
                    <li><strong>Rating: </strong> {anime.score}</li>
                    <li><strong>Status: </strong>{anime.status}</li>
                    
                    <li>
                        {anime.episodes != null ? `Episodes: ${anime.episodes}` : ''}
                    </li>
                    <li><strong>Aired from: </strong> {anime.aired.string}</li>
                    
                    <li><strong>Genres: </strong>{anime.genres.map((genre) => genre.name).join(', ')}</li> {/* pulling from array in API */}
                    <li className='trailer'><a href={anime.trailer.url}>Trailer</a> </li>
                </ul>
            </div>
        </div>
        <div className='anime-details-bottom'>
            <h1>{anime.title_english || anime.title_japanese}</h1>
            
            <p>{anime.synopsis}</p>
        </div>

    </div>
    
</div>
</>
  )
}

export default Info