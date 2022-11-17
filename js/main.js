'use strict';
/*
    #############################################
    Juego memoria donde se muestran 16 parejas de 
    cartas tapadas que se pueden destapar de dos 
    en dos hasta revelar todas.
    #############################################

*/
//Seleccionamos el main con id Tablero, dentro de esta etiqueta trabajaremos
const tablero = document.querySelector('#tablero');
//Escogemos los emojis que se usarán en un array
const emojis = ['😵','🥵','🥶','😱','🌝','🤑','🤠','🎃',
                  '😵','🥵','🥶','😱','🌝','🤑','🤠','🎃'];
//Cambiamos el orden el array de emojis
emojis.sort(() => Math.random() - 0.5);
//ARRAYS CREADOS PARA SELECCIONAR TEMPORALMENTE
const emojisSelected = [];
const idSelected = [];
//CONTADOR PARA NUMERO DE INTENTOS
let count = 0;

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
  //convertimos el array a string y imprimos dentro de la etiqueta main
  tablero.innerHTML = card.join(" ");
}

function comparador(){
  if(emojisSelected[0]===emojisSelected[1]){
  //SOLO ENTRA SI LAS CARTAS IGUALES
    for (const i of idSelected) {
      const flipped = document.getElementById(`${i}`);
      flipped.classList.add('cardsOk');
    }
  //VACIAMOS LOS ARRAYS
    idSelected.splice(0, idSelected.length);
    emojisSelected.splice(0, emojisSelected.length);
  } else{
  //CARTAS DESIGUALES
    deseleccionar();
  } 
}

function deseleccionar(){
//FUNCION QUE ENTRA SI LAS CARTAS NO SON IGUALES
  setTimeout(() => {
    for (const i of idSelected) {
      const flipped = document.getElementById(`${i}`);
      flipped.classList.remove('flipped');
    }
  //VACIAMOS LOS ARRAYS
    idSelected.splice(0, idSelected.length);
    emojisSelected.splice(0, emojisSelected.length);
  }, 1000); 
}

generarCard();

const cards = document.querySelectorAll('.card');
const reveal = (e) => {
  const currentCard = e.currentTarget;
  currentCard.classList.add('flipped');
//SE HACE UN PUSH A LOS ARRAYS TEMPORALES DECLARADOS ANTERIORMENTE
  emojisSelected.push(emojis[currentCard.getAttribute('id')]); 
  idSelected.push(currentCard.getAttribute('id'));

  if(!currentCard.classList.contains('cardsOk')){
//SOLO ENTRA SI LA CARTA NO HA SIDO SELECCIONADA ANTERIORMENTE
    if(idSelected.length===2){
  //Comparador de cartas
      comparador(); 
  //Número de intentos    
    count++;
    }
  }
  if(document.getElementsByClassName('flipped').length === 16){
    setTimeout(() => {
      if(count===8){
        alert("\t\t\t\t"+count+" intentos\n \t\t Lo has petado 💪\n \tYo no lo hubiera hecho mejor!! 😈");
      } else if (count>16){
        alert("\t\t\t\t"+count+" intentos\n \t 🧟🧟creo que un zombie ha pasado por aquí🧠🧠");
      } else {
        alert("Has hecho "+count+" intentos");
      }
      
      if(confirm("¿Quieres intentarlo de nuevo?")){
        location.reload();
      } else{
        alert("GRACIAS POR JUGAR!!");
      }
    }, 600); 
  }
};

for (const card of cards) {
  card.addEventListener('click', reveal);
}
