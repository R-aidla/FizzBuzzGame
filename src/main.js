import './style.css'
import { setupOptionButton, setupSubmitButton } from './buttonSelection.js'
import { ShowGameOverUI, ShowMainScreenUI } from './htmlHud.js'

let baseStartTime = 60;
let baseTimeDivider = 1;
let currentTimeDiv;

let fizzBuzzList = [ 
  {word:"fizz", divisibleBy:3, button:undefined}, 
  {word:"buzz", divisibleBy:5, button:undefined}, 
  {word:"bizz", divisibleBy:7, button:undefined}, 
  {word:"fuzz", divisibleBy:9, button:undefined} 
];

let roundCount = 0;
let currentNumber = 0;
let mistakeCount = 0;
let currentScore = 0;
let highScore = Number(localStorage.getItem("highScore"));

export var interrupted = false;
let timeLeft = 0;
var currentTimer;
let difficulty = 0;

function AddButtons(numberOfButtons, offset)
{
  for (let i = 0 + offset; i < numberOfButtons + offset; i++) {
    const htmlButton = document.createElement("button");
    htmlButton.id = `${fizzBuzzList[i].word}Button`;
    htmlButton.type = "button";
    htmlButton.classList.add("unselectable");
    htmlButton.style.margin = "4px";
    htmlButton.textContent = fizzBuzzList[i].word.toUpperCase();
    
    fizzBuzzList[i].button = htmlButton;
    setupOptionButton(htmlButton);
    document.querySelector('#buttonCard').appendChild(htmlButton);
  }
}

function ReloadValues()
{
  fizzBuzzList = [ 
    {word:"fizz", divisibleBy:3, button:undefined}, 
    {word:"buzz", divisibleBy:5, button:undefined}, 
    {word:"bizz", divisibleBy:7, button:undefined}, 
    {word:"fuzz", divisibleBy:9, button:undefined} 
  ];
  difficulty = 0;
  currentNumber = 0;
  currentScore = 0;
  mistakeCount = 0;
  roundCount = 0;
  currentTimeDiv = baseTimeDivider;
}

let submitButton;
ShowMainScreenUI(highScore);

//setupOptionButton(document.querySelector('#bizzButton'))
//<button id="bizzButton" type="button" class="unselectable">Bizz</button>
//<button id="fuzzButton" type="button" class="unselectable">Fuzz</button>
//setupOptionButton(document.querySelector('#fuzzButton'))

export function StartGame()
{
  ReloadValues();
  document.querySelector('#app').innerHTML = `
  <div>
  <div id="timer" class="unselectable">60</div>
  <div id="numDisplay" class="unselectable">9999</div>
  <div id="buttonCard"></div>
  <button id="submitButton" type="button" class="unselectable">Submit</button>
  </div>
  <div id="currentScore" class="unselectable">Score: 0 / High Score: ${highScore}</div>
  <div id="strikesDisplay"><h1 class="redText"></h1></div>
  <div id="notifyUser" class="grayText">Remember, FIZZ is divisible by 3 and BUZZ by 5.</div>
  `;
  submitButton = document.querySelector('#submitButton');
  setupSubmitButton(submitButton);
  AddButtons(2, 0);  
  ResetTimer();
  NextNumber();
}

function NextNumber()
{
  roundCount++;
  
  if(roundCount % 16 === 0 && roundCount < 100)
  {
    switch (difficulty) {
      case 0:
        difficulty++;
        currentTimeDiv += 0.2;
        document.querySelector('#notifyUser').innerHTML = `Difficulty increase! Time will degrade over multiple rounds`;
        break;
      case 1:
        difficulty++;
        AddButtons(1, 2);
        document.querySelector('#notifyUser').innerHTML = `Difficulty increase! Added BIZZ into the options. BIZZ is divisible by 7`;
        break;
      case 2:
        difficulty++;
        currentTimeDiv += 0.3;
        document.querySelector('#notifyUser').innerHTML = `Difficulty increase! Lets kick it up a notch. Guessing time reduced.`;
        break;
      case 3:
        difficulty++;
        AddButtons(1, 3);
        document.querySelector('#notifyUser').innerHTML = `Difficulty increase! Added FUZZ into the options. FUZZ is divisible by 9`;
        break;
      default:
        currentTimeDiv += 0.05;
        break;
    }
  }
  else if(roundCount >= 100 && difficulty !== 5)
  {
    difficulty = 5;
    document.querySelector('#notifyUser').innerHTML = `Difficulty MAXED! Let RNG decide the next number. I don't feel like counting anymore.`;
  }

  if(difficulty === 5)
    currentNumber = Math.floor(Math.pow(roundCount, 2) * Math.random())
  else
    currentNumber++;

  document.querySelector('#numDisplay').innerHTML = currentNumber;
  interrupted = false;
}

function ResetTimer()
{
  let timerElement = document.querySelector('#timer');
  timerElement.style.animation="";
  if(currentTimeDiv > baseStartTime / 4)
    currentTimeDiv = currentTimeDiv + 0.025 * roundCount
  
  timeLeft = Math.floor(baseStartTime / currentTimeDiv);
  timerElement.innerHTML = timeLeft;

  if(currentTimer !== undefined)
    clearInterval(currentTimer);

  currentTimer = setInterval(() => {
    timeLeft--;
    
    if (timeLeft == 10)
      document.querySelector('#timer').style.animation="timerWarning 5s linear 1 forwards";
    if (timeLeft == 5)
      document.querySelector('#timer').style.animation="timerEnding 5s linear 1 forwards";


    timerElement.innerHTML = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(currentTimer);
        CheckSelection();
    }
}, 1000);
}

export function CheckSelection()
{
  if(interrupted)
    return;

  interrupted = true;
  clearInterval(currentTimer);
  let numOfCorrects = 0;
  let requiredNum = 0;
  let affectedButtons = [];

  for (const fizzBuzzObject of fizzBuzzList) {
    const fizzBuzzButton = fizzBuzzObject.button;

    if(!fizzBuzzButton) continue;

    if(currentNumber % fizzBuzzObject.divisibleBy == 0)
    {
      requiredNum++;
      if(fizzBuzzButton.classList.contains("selected"))
      {  
        affectedButtons.push(fizzBuzzButton);
        fizzBuzzButton.classList.add("correct");
        numOfCorrects++;
      }
    }
    else if(fizzBuzzButton.classList.contains("selected"))
    {  
      affectedButtons.push(fizzBuzzButton);
      fizzBuzzButton.classList.add("incorrect");
      numOfCorrects--;
    }
  }
  
  let pauseTime = 1;
  if(requiredNum === numOfCorrects)
  { 
    // You won
    if(requiredNum === 4)
      if(mistakeCount > 0) // If player made mistake
        mistakeCount--; // Revoke mistake
      else
        currentScore += Math.pow(2, requiredNum - 1);
    else
      if(requiredNum == 0)
        currentScore += Math.pow(2, requiredNum);
      else
        currentScore += Math.pow(2, requiredNum - 1);
    
    document.querySelector('#numDisplay').style.color="green";
    document.querySelector('#currentScore').innerHTML = `Score: ${currentScore} / High Score: ${highScore}`;

    const pause = setInterval(() => {
      if (pauseTime <= 0) {
        document.querySelector('#numDisplay').style.color="";
        clearInterval(pause);
        NextNumber();
        ResetTimer();
        for (const button of affectedButtons)
        {  
          button.classList.remove("correct");
          button.classList.remove("incorrect");
        }
        affectedButtons.length = 0;
      }
      pauseTime--;
    }, 250);
  }
  else
  {
    // You lost
    document.querySelector("#submitButton").classList.add("incorrect");
    document.querySelector('#strikesDisplay .redText').innerHTML += 'X ';
    
    mistakeCount++;
    document.querySelector('#numDisplay').style.color="red";
    const pause = setInterval(() => {
      if (pauseTime <= 0) {
        document.querySelector('#numDisplay').style.color="";
        clearInterval(pause);
        if(mistakeCount >= 3)
        {
          ShowGameOverUI(currentScore, highScore);
        }
        else
        {
          NextNumber();
          ResetTimer();
          for (const button of affectedButtons)
          {  
            button.classList.remove("correct");
            button.classList.remove("incorrect");
          }        
          document.querySelector("#submitButton").classList.remove("incorrect");
        }
      }
      pauseTime--;
    }, 1000);
  }
}

export function ResetButtons()
{
  for (const fizzBuzzObject of fizzBuzzList) {
    if(fizzBuzzObject.button !== undefined)
      setupOptionButton(fizzBuzzObject.button);
  };
}