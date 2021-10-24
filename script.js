'use strict';

//Selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');

const diceEl = document.querySelector('.dice');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//selecting buttons
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let activePlayer, score, gameOver, turnCount, currentScore;

//Initial setup
const init = function(){
    //initializes activePlayer
    activePlayer = 0;   //placeholder for current player
    score = [0, 0];
    gameOver = false;
    turnCount = 0;  //equals FALSE by definition of 0
    currentScore = 0;   //placeholder for total dice points
    
    score0El.textContent = score[0];   //setting initial score at 0 for player 1
    score1El.textContent = score[1];   //intial score 0 for p2
    diceEl.classList.add('hidden'); //hides dice on initial startup
    
    document.getElementById('current--0').textContent = currentScore;
    document.getElementById('current--1').textContent = currentScore;

    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');

    player0El.classList.add('player--active');
    player1El.classList.remove('player--active');
}
init();     //initializes game


const switchPlayer = function(){
    //reinitialize currentScore back to ZERO
    turnCount=0;    //restarts counter
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    //toggle and highlights active player
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    activePlayer = activePlayer === 0 ? 1 : 0;
};


const rollDice = function(){
    //Randomizes number for dice 1-6 values
    let dice = Math.trunc(Math.random()*6+1);

    //displays dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //checks if dice is 1 and continues, or else switches player
    if(dice !== 1 || !turnCount){
        currentScore += dice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        turnCount++;
    }else{
        switchPlayer();
    }    
};


const holdDice = function(){
    // add currentScore to score and display it
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

    //Check if player wins round...
    if(score[activePlayer]>=50){
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
        document.getElementById(`name--${activePlayer}`).textContent = `WINNER!`
        gameOver = true;
        diceEl.classList.add('hidden');
    }

    //change activePlayer to the other (Apply DRY)
    switchPlayer();
}

const newGame = function(){
    init(); //initializes game 
};


//Roll dice button
btnRoll.addEventListener('click', function(){
    if(!gameOver){
        rollDice();
    }
});

//Hold button
btnHold.addEventListener('click', function(){
    if(!gameOver){
        holdDice();
    }
});

//New Game button
btnNew.addEventListener('click', newGame);


//Checks key shortcut press
document.addEventListener("keydown", function(e){
    console.log(e.key);
    switch (e.key) {
        case 'r':
            if(!gameOver)
            rollDice();
            break;
        case 'h':
            if(!gameOver)
            holdDice();
            break;
        case 'n':
            newGame();
            break;
        default:
            break;
    }
});