'use strict';
/*
    #############################################
    Juego memoria donde se muestran 16 parejas de 
    cartas tapadas que se pueden destapar de dos 
    en dos hasta revelar todas.
    #############################################
*/
//Seleccionamos el main con id Tablero, dentro de esta etiqueta trabajaremos
let tablero = document.querySelector('#tablero');
//Escogemos los emojis que se usarán en un array
const emojis = ['😵','🥵','🥶','😱','🌝','🤑','🤠','🎃',
                  '😵','🥵','🥶','😱','🌝','🤑','🤠','🎃'];
//Cambiamos el orden el array de emojis
emojis.sort(() => Math.random() - 0.5);
/*
Creamos la funcion generarCard será la 
encarga de imprimir todas las carta de emojis con el orden random
*/
function generarCard() {
  const card = [];
  //Declaramos un for por la cantidad de Cartas emojis que vamos a necesitar
  for (let i = 0; i < 16; i++) {
  //Guardamos en un array para luego mostrarlos
    card.push(`
      <section class="card">
        <div class="content">
          <div class="front">${emojis[i]}</div>
          <div class="back">❔</div>
        </div>
      </section>       
      `);
  }
  //transformamos el array a string y imprimos dentro de la etiqueta main
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
