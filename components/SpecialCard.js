/* Adapted from https://github.com/simeydotme/pokemon-cards-css */

import { useState, useEffect } from 'react'
import { clamp, round, adjust } from '@/utils/math'
// import { orientation, resetBaseOrientation } from '@/utils/orientation'

export default function Card({
  id = 'swsh12pt5-160',
  set = 'swsh12pt5',
  number = '160',
  name = 'Pikachu',
  types = ['Lightning'],
  subtypes = ['Basic'],
  supertype = 'Pokémon',
  rarity = 'Rare Secret',
  images = {
    small: 'https://images.pokemontcg.io/swsh12pt5/160.png',
    large: 'https://images.pokemontcg.io/swsh12pt5/160_hires.png'
  },
  back = 'https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg',
  activeCard,
  setActiveCard,
  index
}) {
  const interact = e => {
    if (e.type === 'touchmove') {
    }
  }

  return (
    <div>
      <style jsx>{`
        :root {
          --pointer-x: 50%;
          --pointer-y: 50%;
          --card-scale: 1;
          --card-opacity: 0;
          --translate-x: 0px;
          --translate-y: 0px;
          --rotate-x: 0deg;
          --rotate-y: 0deg;
          --background-x: var(--pointer-x);
          --background-y: var(--pointer-y);
          --pointer-from-center: 0;
          --pointer-from-top: var(--pointer-from-center);
          --pointer-from-left: var(--pointer-from-center);
        }
      `}</style>
      <div className="card__translater">
        <button
          tabIndex={0}
          aria-label={`Expand the Pokemon Card; ${name}`}
          className="card__rotator"
          // onClick={activate}
          onPointerMove={interact}
          onMouseOut={interactEnd}
          // onBlur={deactivate}
        >
          <img
            className="card__back"
            src={backImg}
            alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
            loading="lazy"
            width="660"
            height="921"
          />
          <div className="card_front">
            <style jsx>{staticStyles + foilStyles}</style>
            <img
              src={frontImg}
              alt={`Front design of the ${name} Pokemon Card, with the stats and info around the edge`}
              onLoad={imageLoader}
              loading="lazy"
              width="660"
              height="921"
            />
            <div className="card__shine" />
            <div className="card__glare" />
          </div>
        </button>
      </div>
    </div>
  )
}
