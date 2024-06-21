let randomNumber = Math.floor(Math.random() * 100) + 1;

const submit = document.querySelector('#subt');
const userInput = document.querySelector('#guessField');
const guessSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const startOver = document.querySelector('.resultParas');

const p = document.createElement('p');
p.classList.add('button');
p.innerHTML = `<h2 id="newGame">Start New Game</h2>`;

let prevGuesses = [];
let numGuesses = 1;
let playGame = true;

submit.addEventListener('click', (e) => {
  e.preventDefault();
  if (playGame) {
    const guess = parseInt(userInput.value);
    validateGuess(guess);
  }
});

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert('Please enter a valid number');
  } else if (guess < 1) {
    alert('Please enter a number greater than 0');
  } else if (guess > 100) {
    alert('Please enter a number less than 101');
  } else {
    prevGuesses.push(guess);
    displayGuess(guess);
    checkGuess(guess);
  }
}

function checkGuess(guess) {
  if (guess === randomNumber) {
    displayMessage('You guessed it right!');
    endGame();
  } else if (guess < randomNumber) {
    displayMessage('Number is too low');
  } else {
    displayMessage('Number is too high');
  }

  if (numGuesses === 11) {
    displayMessage(`Game Over. The number was ${randomNumber}`);
    endGame();
  }
}

function displayGuess(guess) {
  userInput.value = '';
  guessSlot.textContent += `${guess}, `;
  remaining.textContent = `${11 - numGuesses++}`;
}

function displayMessage(message) {
  lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
  userInput.setAttribute('disabled', '');
  startOver.appendChild(p);
  playGame = false;
  p.addEventListener('click', newGame);
}

function newGame() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  prevGuesses = [];
  numGuesses = 1;
  guessSlot.textContent = '';
  remaining.textContent = '10';
  lowOrHi.innerHTML = '';
  userInput.removeAttribute('disabled');
  startOver.removeChild(p);
  playGame = true;
}
