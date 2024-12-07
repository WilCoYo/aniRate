import React from 'react'
import { useNavigate} from 'react-router-dom'
import './TitleCards.css'
import info_icon from '../../assets/images/info-icon.svg'
import add_icon from '../../assets/images/add-icon.svg'
import { addToWatchlist, auth} from '../../firebase'









function TitleCards({anime, onWatchlistUpdate}) {  
    const userId = auth.currentUser?.uid;
    const navigate = useNavigate();

   

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

    // const handleRemoveFromWatchlist = () => {
    //     if(anime.mal_id) {
    //         removeFromWatchlist(userId, anime.mal_id);
    //     } else {
    //         console.log("Anime not found or already deleted")
    //     }
    // }






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
                                onClick={handleAddToWatchlist}
                        >
                            <img src={add_icon} alt=''/>Add to watchlist
                        </button> 

                        <button 
                            className='titlecard-btn-rt btn'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/info', {state: { anime }}); //passing anime to Info 
                            }}
                        >
                            <img src={info_icon} alt=''/>More Info
                        </button>

                    </div>
                    
                
            </div>
        </div>
    )
}

export default TitleCards