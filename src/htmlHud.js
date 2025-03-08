import { StartGame } from './main.js'

export function ShowGameOverUI(currentScore, highScore)
{
  document.querySelector('#app').innerHTML = `
  <div>
  <h1 class="unselectable">Game over!</h1>
  <h2 class="unselectable">You scored ${currentScore} point(s).</h2>
  `;
  if(highScore < currentScore)
  {
    document.querySelector('#app').innerHTML += `
    <h2>A new high score has been achieved!<h2>
    <p>The new high score is ${currentScore} point(s).</hp>
    <p>The previous high score was ${highScore} point(s).</hp>
    `;

    highScore = currentScore;
    localStorage.setItem("highScore", currentScore);
  }
  else
  {
    document.querySelector('#app').innerHTML += `
    <p>You can always do better then last time.</p>
    `;
  }
  document.querySelector('#app').innerHTML += `
  <button id="startButton" type="button" class="unselectable">Restart Game</button>
  <button id="tutorialButton" type="button" class="unselectable">How to play?</button>
  `;
  document.querySelector('#startButton').addEventListener("click", () => StartGame())
  document.querySelector('#tutorialButton').addEventListener("click", () => ShowTutorialUI())
}

export function ShowMainScreenUI(highScore)
{
  document.querySelector('#app').innerHTML = `
  <div class="titleBox">
  <h1 class="unselectable">Welcome to the game of FizzBuzz!</h1>
  <p class="unselectable">The programmers fabled test. Now a brainteaser for the wannaby flesh computers.</p>
  </div>
  <button id="startButton" type="button" class="unselectable">Start Game</button>
  <button id="tutorialButton" type="button" class="unselectable">How to play?</button>
  `;

  if(highScore !== 0)
    document.querySelector('#app').innerHTML += `
  <div>
  <h2 class="unselectable">Your high score is ${highScore} point(s)!</h2>
  </div>
  `;
  document.querySelector('#startButton').addEventListener("click", () => StartGame())
  document.querySelector('#tutorialButton').addEventListener("click", () => ShowTutorialUI())
}

export function ShowTutorialUI()
{
  document.querySelector('#app').innerHTML = `
  <div class="hybridBox">
  <div class="textBox">
  <h1 class="unselectable">What is Fizz Buzz?</h1>
  <p class="unselectable">Fizz Buzz is a group word game used to teach children about division.
  Players take turns to count incrementally, replacing any number divisible by 3 with the word "Fizz",
  and any number divisible by 5 with the word "Buzz", and any number divisible by both 3 and 5 with the word "FizzBuzz".</p>
  <p class="unselectable grayText">Cited from <a href="https://en.wikipedia.org/wiki/Fizz_buzz" target="_blank">Wikipedia</a>.</p>
  </div>
  </div>
  <div class="hybridBox">
  <div class="imgBox">
  <img src=./FizzBuzzGame/images/Example1.png alt="Showing UI" />
  <img src=./FizzBuzzGame/images/Example2.png alt="Incorrect answer" />
  </div>
  <div class="textBox">
  <h1 class="unselectable">How to play this version?</h1>
  <p class="unselectable">This version of Fizz Buzz works the same way but instead, you have to select
  the right words, select one or multiple if divisible and press Submit. After that you will be shown if you were right or wrong.
  You see a green number and Submit button if you are correct and red if wrong.
  </p>
  </div>
  </div>
    <div class="hybridBox">
  <div class="textBox">
  <h1 class="unselectable">What else should I know?</h1>
  <p class="unselectable">Every 16 rounds, I will make the game more difficult by decreasing the guessing
  time and add new divisible numbers and words (max 4 words total). The game is infinite, so try to beat
  your high score or play it with other people and see who's the worst at math.</p>
  </div>
  </div>
  <button id="startButton" type="button" class="unselectable">Start Game</button>
  </div>
  `;
  document.querySelector('#startButton').addEventListener("click", () => StartGame())
}