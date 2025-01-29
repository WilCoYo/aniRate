import React from 'react'
import { useNavigate} from 'react-router-dom'
import './TitleCards.css'
import info_icon from '../../assets/images/info-icon.svg'
import add_icon from '../../assets/images/add-icon.svg'
import { addToWatchlist, auth} from '../../firebase'
import { toast } from 'react-toastify';
import { DateTime } from 'luxon'








function TitleCards({anime, onWatchlistUpdate, parentComponent}) {  
    const userId = auth.currentUser?.uid;
    const navigate = useNavigate();

   

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

    const convertJSTtoUserTimezone = (inputString) => {
        if(!inputString || typeof inputString !== "string") {
            return "Invalid Time Format";
        }


        const timeMatch = inputString.match(/(\d{2}):(\d{2})/);

        if(!timeMatch) return "Invalid time format";

        const [_, hours, minutes] = timeMatch;

        const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

        const jstTime = DateTime.fromObject(
            { hour: parseInt(hours), minute: parseInt(minutes) },
            { zone: "Asia/Tokyo" }
        );

        const userTime = jstTime.setZone(userTimeZone);

        

        return `Saturdays at ${userTime.toFormat("HH:mm")} (${userTimeZone})`;
    };


    




    return (
        <div className={`anime-card ${parentComponent}`} >
            <div className='card-list'>
                
                    <div className='anime-image'>
                        {anime.broadcast.string === 'unknown' ? (
                            <div className={`anime-card-date-time ${parentComponent}`}>
                                <h4>Broadcast Info Unknown</h4>
                            </div>  
                        ) :
                            <div className='anime-card-date-time'>
                                <h4>{convertJSTtoUserTimezone(anime.broadcast.string)}</h4>
                            </div>

                        }
                       
                        <img
                            
                            src={anime.images.jpg.image_url} 
                            alt='Anime Cover Art'
                        />
                        <div className='anime-card-caption'>
                            <h4>{ anime.title_english || anime.title }</h4>
                        </div>
                    
                    </div>

                   
                    
                    
                    <div className={`titlecard-btns ${parentComponent}`}>
                        
                        <button className='titlecard-btn-lft btn'
                                onClick={handleAddToWatchlist}
                        >
                            <img src={add_icon} alt=''/>
                        </button> 

                        <button 
                            className='titlecard-btn-rt btn'
                            onClick={(e) => {
                                e.preventDefault();
                                navigate('/info', {state: { anime }}); //passing anime to Info 
                            }}
                        >
                            <img src={info_icon} alt=''/>
                        </button>

                    </div>
                    
                
            </div>
        </div>
    )
}

export default TitleCards