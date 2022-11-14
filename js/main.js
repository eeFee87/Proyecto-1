'use strict';
/*
    #############################################
    Juego memoria donde se muestran 16 parejas de 
    cartas tapadas que se pueden destapar de dos 
    en dos hasta revelar todas.
    #############################################
*/
let tablero = document.querySelector('#tablero');
const emojis = [
  '😵',
  '🥵',
  '🥶',
  '😱',
  '🌝',
  '🤑',
  '🤠',
  '🎃',
  '😵',
  '🥵',
  '🥶',
  '😱',
  '🌝',
  '🤑',
  '🤠',
  '🎃',
];
//En la variable shuffleEmojis guardamos el array pero desordenado cada vez que recargamos la pagina.
const shuffleEmojis = emojis.sort(function () {
  return Math.random() - 0.5;
});
console.log(shuffleEmojis);

function generarCard() {
  const card = [];
  for (let i = 0; i < 16; i++) {
    card.push(`
      <section class="card">
        <div class="content">
          <div class="front">❔</div>
          <div class="back">${shuffleEmojis[i]}</div>
        </div>
      </section>       
      `);
    //console.log(i);
  }
  //console.log(card);

  tablero.innerHTML = card.join(' ');
}

generarCard();
let cards = document.querySelectorAll('.card');

const reveal = (e) => {
  const currentCard = e.currentTarget;

  currentCard.classList.add('flipped');
  let flippeds = document.querySelectorAll('.flipped');

  if (flippeds.length === 2) {
    setTimeout(() => {
      for (const flipped of flippeds) {
        flipped.classList.remove('flipped');
      }
    }, 1000);
  }
};

for (const card of cards) {
  card.addEventListener('click', reveal);
}
