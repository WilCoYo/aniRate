import React from 'react'

function Watchlist() {
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