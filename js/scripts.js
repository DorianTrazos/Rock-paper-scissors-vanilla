const gameContainerElement = document.getElementById('game-container');

const gameResultsElement = document.getElementById('game-results');
const playAgainElement = document.getElementById('play-again');

const resultUserContainerElement = document.getElementById('result-user-container');
const resultPcContainerElement = document.getElementById('result-pc-container');
const resultUserElement = document.getElementById('result-user');
const resultPcElement = document.getElementById('result-pc');

const userScoreElement = document.getElementById('user-score');
const pcScoreElement = document.getElementById('pc-score');
const resultTextElement = document.getElementById('result-text');

const rulesElement = document.getElementById('rules');
const modalElement = document.getElementById('modal');
const closeModalElement = document.getElementById('close-modal');

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

const iconImages = {
  rock: '../assets/images/icon-rock.svg',
  paper: '../assets/images/icon-paper.svg',
  scissors: '../assets/images/icon-scissors.svg',
  lizard: '../assets/images/icon-lizard.svg',
  spock: '../assets/images/icon-spock.svg'
};

let userPlay;
let pcPlay;
let userScore = 0;
let pcScore = 0;

const updateScore = () => {
  userScoreElement.textContent = userScore;
  pcScoreElement.textContent = pcScore;
};

const checkWinner = () => {
  if (userPlay === pcPlay) {
    resultTextElement.textContent = 'TIE';
    return;
  }

  if (gameRules[userPlay][pcPlay]) {
    resultTextElement.textContent = 'YOU WIN';
    userScore++;
  } else {
    resultTextElement.textContent = 'YOU LOSE';
    pcScore++;
  }

  updateScore();
};

const showResults = () => {
  gameContainerElement.classList.add('hide');
  gameResultsElement.classList.remove('hide');
  checkWinner();
};

const hideResults = () => {
  gameResultsElement.classList.add('hide');
  gameContainerElement.classList.remove('hide');
};

const setResultsImages = () => {
  resultUserElement.src = iconImages[userPlay];
  resultUserContainerElement.classList.remove('paper', 'scissors', 'rock');
  resultUserContainerElement.classList.add(userPlay);

  resultPcElement.src = iconImages[pcPlay];
  resultPcContainerElement.classList.remove('paper', 'scissors', 'rock');
  resultPcContainerElement.classList.add(pcPlay);

  showResults();
};

const generatePcPlay = () => {
  const randomPlay = Math.floor(Math.random() * gameOptions.length);
  pcPlay = gameOptions[randomPlay];
  setResultsImages();
};

const setUserPlay = event => {
  if (!event.target.dataset.item) {
    return;
  }

  userPlay = event.target.dataset.item;
  generatePcPlay();
};

const showModal = () => {
  modalElement.classList.add('modal-show');
};

const hideModal = () => {
  modalElement.classList.remove('modal-show');
};

gameContainerElement.addEventListener('click', setUserPlay);

playAgainElement.addEventListener('click', hideResults);

rulesElement.addEventListener('click', showModal);
closeModalElement.addEventListener('click', hideModal);
