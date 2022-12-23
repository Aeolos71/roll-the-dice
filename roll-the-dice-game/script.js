'use strict';

// Selecting the elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const currentSection0El = document.querySelector('.current-section--0');
const currentSection1El = document.querySelector('.current-section--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const winner0El = document.querySelector('.winner--0');
const winner1El = document.querySelector('.winner--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  btnNew.textContent = '🔄 Reset Game';

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  winner0El.classList.add('hidden');
  winner1El.classList.add('hidden');
  currentSection0El.classList.remove('hidden');
  currentSection1El.classList.remove('hidden');
  btnRoll.classList.remove('hidden');
  btnHold.classList.remove('hidden');
};
init();

// Rolling dice animation restart
const restartDiceAnimation = function (event) {
  diceEl.style.animationName = 'none';
  requestAnimationFrame(() => {
    diceEl.style.animationName = '';
  });
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // The toggle() adds the class to the element if it is not there
  // but it removes the class from the element if it is there
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', restartDiceAnimation, false);

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    //btnNew.textContent = 'Reset Game';

    // 3. Check for rolled 1: if true, switch to next player
    if (dice != 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if player's score is >= 100
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      currentSection0El.classList.add('hidden');
      currentSection1El.classList.add('hidden');
      btnRoll.classList.add('hidden');
      btnHold.classList.add('hidden');
      btnNew.classList.remove('hidden');
      btnNew.textContent = '🔄 New Game';

      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      document
        .querySelector(`.winner--${activePlayer}`)
        .classList.remove('hidden');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
