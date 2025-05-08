'use strict';

// Grabbing All The Elements
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const currentScore0El = document.querySelector("#current--0");
const currentScore1El = document.querySelector("#current--1");
const newBtn = document.querySelector(".btn--new");
const RollBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");
const diceEl = document.querySelector(".dice");

let playerScores , playing , currentPlayer , currentScore;
// Initial Game Settings
const init = function(){
    playing = true;
    currentPlayer = 0;
    diceEl.classList.add("hidden");
    currentScore = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    score0El.textContent = 0;
    score1El.textContent = 0;
    playerScores = [0,0];
    player0.classList.remove("player--winner");
    player1.classList.remove("player--winner");
    if(player1.classList.contains("player--active")){
        player0.classList.toggle("player--active");
        player1.classList.toggle("player--active");
    }
}

const SwitchPlayer = function(){
    player0.classList.toggle("player--active");
    player1.classList.toggle("player--active");
    currentPlayer = currentPlayer === 0 ? 1 : 0;
}

RollBtn.addEventListener("click" , function(){
    if(playing){
        const dice = Math.trunc(Math.random() * 6) + 1;
        diceEl.src = `dice-${dice}.png`;
        diceEl.classList.remove("hidden");
        if(dice !== 1){
            currentScore += dice;
            document.querySelector(`#current--${currentPlayer}`).textContent = currentScore;
        }
        else{
            currentScore = 0;
            document.querySelector(`#current--${currentPlayer}`).textContent = currentScore;
            playerScores[currentPlayer] = 0;
            document.querySelector(`#score--${currentPlayer}`).textContent = playerScores[currentPlayer];
            SwitchPlayer();
        }
    }
});

holdBtn.addEventListener("click" , function(){
    if(playing){
        playerScores[currentPlayer] += currentScore;
        document.querySelector(`#score--${currentPlayer}`).textContent = playerScores[currentPlayer];
        currentScore = 0;
        if(playerScores[currentPlayer] >= 50){
            document.querySelector(`.player--${currentPlayer}`).classList.add("player--winner");
            playing = false;
        }
        SwitchPlayer();
    }
});

newBtn.addEventListener("click" , init);
