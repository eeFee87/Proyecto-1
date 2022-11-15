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
const emojisSelected = [];
const idSelected = [];
let cont = 0;

//Creamos la funcion generarCard será la 
//encarga de imprimir todas las carta de emojis con el orden random
function generarCard() {
  const card = [];
  //Declaramos un for por la cantidad de Cartas emojis que vamos a necesitar
  for (let i = 0; i < 16; i++) {
  //Guardamos en un array para luego mostrarlos
    card.push(`
      <section id="${i}" class="card">
        <div class="content">
          <div class="front">❔</div>
          <div class="back">${emojis[i]}</div>
        </div>
      </section>       
      `);
  }
  //transformamos el array a string y imprimos dentro de la etiqueta main
  tablero.innerHTML = card.join(" ");
}

function comparador(){
  if(emojisSelected[0]===emojisSelected[1]){
    //CARTAS IGUALES
    for (const i of idSelected) {
      const flipped = document.getElementById(`${i}`);
      flipped.classList.add('cardsOk');
    }
    idSelected.splice(0, idSelected.length);
    emojisSelected.splice(0, emojisSelected.length);
  } else{
    deseleccionar();
  }  
}

function deseleccionar(){
  setTimeout(() => {
    for (const i of idSelected) {
      const flipped = document.getElementById(`${i}`);
      flipped.classList.remove('flipped');
    }
    idSelected.splice(0, idSelected.length);
    emojisSelected.splice(0, emojisSelected.length);
  }, 1000); 
}

generarCard();

let cards = document.querySelectorAll('.card');
const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add('flipped');
//Obtenemos las id de las cartas flipped y el emoji
  emojisSelected.unshift(emojis[currentCard.getAttribute('id')]); 
  idSelected.push(currentCard.getAttribute('id'));
  if(!currentCard.classList.contains('cardsOk')){
    if(idSelected.length===2){
  //Comparador de cartas
      comparador(); 
  //Contador para el números de intentos    
    cont++;
    }
  }
  if(document.getElementsByClassName('flipped').length === 16){
    alert("Se han hecho "+cont+" intentos");
  }
};



for (const card of cards) {
  card.addEventListener('click', reveal);
}
