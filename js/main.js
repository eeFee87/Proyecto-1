'use strict';
/*
    #############################################
    Juego memoria donde se muestran 16 parejas de 
    cartas tapadas que se pueden destapar de dos 
    en dos hasta revelar todas.
    #############################################
*/
let tablero = document.querySelector('#tablero');
const emojis = ['😵','🥵','🥶','😱','🌝','🤑','🤠','🎃',
                  '😵','🥵','🥶','😱','🌝','🤑','🤠','🎃'];
const shuffleEmojis = [];

function searchEmojis() {
  let num = Math.round(Math.random() * 16);
  return num;
}
let emoji = searchEmojis();
console.log(emoji);

function generarCard() {
  const card = [];
  for (let i = 0; i < 16; i++) {
    //emoji = searchEmojis();
      card.push(`
      <section class="card">
        <div class="content">
          <div class="front">❔</div>
          <div class="back">🌝</div>
        </div>
      </section>       
      `);
      //console.log(i);
  }
  //console.log(card);
  //tarjetas.sort(() => Math.random() - 0.5)
  tablero.innerHTML = card.join(" ");
}

generarCard();
let cards = document.querySelectorAll('.card');

const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add('flipped');

  setTimeout(() => {
    currentCard.classList.remove('flipped');
  }, 1000);
};

for (const card of cards) {
  card.addEventListener('click', reveal);
}
