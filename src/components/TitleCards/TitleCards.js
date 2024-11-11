import React from 'react'
import './TitleCards.css'

function TitleCards({anime}) {
  return (
    <article className='anime-card'>
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
            </figure>
            <h3>{ anime.title_english || anime.title }</h3>
        </a>
    </article>
  )
}

export default TitleCards