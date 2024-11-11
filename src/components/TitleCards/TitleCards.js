import React from 'react'
import './TitleCards.css'



function TitleCards({anime}) {

  return (
    <div className='anime-card'>
        <div className='card-list'>
            <a href={anime.url} 
                target='_blank' 
                rel='noreferrer'
            >
                <figure>
                    <img
                        className='anime-image'
                        src={anime.images.jpg.image_url} 
                        alt='Anime Cover Art'
                    />
                    <h3>{ anime.title_english || anime.title }</h3>
                </figure>
                
            </a>
        </div>
    </div>
  )
}

export default TitleCards