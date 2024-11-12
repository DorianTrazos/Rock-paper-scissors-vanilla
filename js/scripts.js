/* 
  Localizar los elementos del DOM
  Detectar donde hace click el jugador
  Guardar esa jugada
  Generar la jugada aleatoria del PC
  Guardar la jugada
    Cambiar las imágenes del resultado para que coincidan con las jugadas
    Añadir las clases a los iconos para que mantengan el mismo color

  Comparar las jugadas
  Establecer ganador
  Cambiar marcadores

  Cambiar textos victoria


  // si la función asigna -> set....
  // si la función obtiene -> get....
  // si la función cambia algo -> change....
  // si la función genera algo -> generate....
  // si la función chequea algo -> check....
  // si la función actualiza algo -> update....
*/

const gameContainerElement = document.getElementById('game-container');
const gameResultsElement = document.getElementById('game-results');
const userResultContainerElement = document.getElementById('user-result-container');
const pcResultContainerElement = document.getElementById('pc-result-container');
const userResultElement = document.getElementById('user-result');
const pcResultElement = document.getElementById('pc-result');
const userScoreElement = document.getElementById('user-score');
const pcScoreElement = document.getElementById('pc-score');
const playAgainElement = document.getElementById('play-again');
const textResultElement = document.getElementById('result-text');

let userChoice;
let pcChoice;
let userScore = 0;
let pcScore = 0;

const gameOptions = ['paper', 'rock', 'scissors'];

const gameRules = {
  rock: {
    scissors: true,
    lizard: true,
    paper: false,
    spock: false
  },
  scissors: {
    paper: true,
    lizard: true,
    rock: false,
    spock: false
  },
  paper: {
    rock: true,
    spock: true,
    lizard: false,
    scissors: false
  },
  lizard: {
    paper: true,
    spock: true,
    scissors: false,
    rock: false
  },
  spock: {
    rock: true,
    scissors: true,
    paper: false,
    lizard: false
  }
};

if (document.body.dataset.mode === 'advanced') {
  gameOptions.push('lizard', 'spock');
}

const showResults = () => {
  gameContainerElement.classList.add('hide');
  gameResultsElement.classList.remove('hide');
};

const showGame = () => {
  gameResultsElement.classList.add('hide');
  gameContainerElement.classList.remove('hide');
};

const updateScore = () => {
  userScoreElement.textContent = userScore;
  pcScoreElement.textContent = pcScore;
  showResults();
};

const checkWinner = () => {
  if (userChoice === pcChoice) {
    textResultElement.textContent = 'TIE';
  } else if (gameRules[userChoice][pcChoice]) {
    textResultElement.textContent = 'YOU WIN';
    userScore++;
  } else {
    textResultElement.textContent = 'YOU LOSE';
    pcScore++;
  }

  updateScore();
};

const changeIconResult = () => {
  userResultContainerElement.classList.remove(...gameOptions);
  userResultContainerElement.classList.add(userChoice);
  userResultElement.src = `../assets/images/icon-${userChoice}.svg`;

  pcResultContainerElement.classList.remove(...gameOptions);
  pcResultContainerElement.classList.add(pcChoice);
  pcResultElement.src = `../assets/images/icon-${pcChoice}.svg`;

  checkWinner();
};

const setPcChoice = () => {
  const randomNumber = Math.floor(Math.random() * gameOptions.length);
  pcChoice = gameOptions[randomNumber];
  changeIconResult();
};

const setUserChoice = event => {
  if (!event.target.dataset.item) {
    return;
  }

  userChoice = event.target.dataset.item;
  setPcChoice();
};

gameContainerElement.addEventListener('click', setUserChoice);
playAgainElement.addEventListener('click', showGame);
