import React from 'react'
import { useEffect, useRef, useLayoutEffect } from 'react'

import './SeasonalAnime.css'
import TitleCards from '../TitleCards/TitleCards'


function SeasonalAnime({seasonalAnime}) {


 


const cardsRef = useRef(null);


useLayoutEffect(() => {
  const ref = cardsRef.current;
  console.log('Ref assigned:', ref); // Should now log the DOM node

  const handleWheel = (event) => {
    if (ref) {
      event.preventDefault();
      ref.scrollLeft += event.deltaY;
    }
  };

  if (ref) {
    ref.addEventListener('wheel', handleWheel, { passive: false });
  }

  return () => {
    if (ref) ref.removeEventListener('wheel', handleWheel);
  };
}, []);


useEffect(() => {
  if (seasonalAnime.length > 0 && cardsRef.current) {
    const ref = cardsRef.current;
    console.log('Ref assigned:', ref); // Should now log the DOM node

    const handleWheel = (event) => {
      event.preventDefault();
      ref.scrollLeft += event.deltaY;
    };

    ref.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      ref.removeEventListener('wheel', handleWheel);
    };
  }
  // eslint-disable-next-line
}, [cardsRef]);


return (
  <div className="seasonal-section">
    <h3><strong className="pulse">Fall</strong> Anime</h3>
    <div className="seasonal-list" ref={cardsRef}>
      {seasonalAnime.length > 0 ? (
        seasonalAnime.map((anime) =>
          anime && anime.mal_id ? (
            <TitleCards key={anime.mal_id} anime={anime} />
          ) : null
        )
      ) : (
        <p>Loading top anime...</p>
      )}
    </div>
  </div>
);
}


export default SeasonalAnime