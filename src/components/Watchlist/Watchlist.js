import React from 'react'
import '../TitleCards/TitleCards.css'
import info_icon from '../../assets/images/info-icon.svg'
import add_icon from '../../assets/images/add-icon.svg'
import { removeFromWatchlist, auth } from '../../firebase'

function Watchlist({anime}) {
    const userId = auth.currentUser?.uid;

    const handleRemoveToWatchlist = () => {
        if(userId) {
            removeFromWatchlist(userId, anime.mal_id);
        } else {
            console.log("User is not authenticated")
        }
        
    }

    return (
        <div className='anime-card'>
            <div className='card-list'>
                
                    <figure>
                        <img
                            className='anime-image'
                            src={anime.images.jpg.image_url} 
                            alt='Anime Cover Art'
                        />
                    
                    </figure>

                    <div className='anime-card-caption'>
                        <h3>{ anime.title_english || anime.title }</h3>
                    </div>
                    
                    
                    <div className='titlecard-btns'>
                        
                        <button className='titlecard-btn-lft btn btn-content'
                                onClick={handleRemoveToWatchlist}
                        >
                            <img src={add_icon} alt=''/>Remove from watchlist
                        </button> 

                        <button className='titlecard-btn-rt btn'>
                        <a href={anime.url} 
                            target='_blank' 
                            rel='noreferrer'
                            className='btn-content'
                            
                        >
                            <img src={info_icon} alt=''/>More Info
                        </a>
                        </button>

                    </div>
                    
                
            </div>
        </div>
    )
}

export default Watchlist