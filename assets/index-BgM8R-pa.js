(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const i of n)if(i.type==="childList")for(const h of i.addedNodes)h.tagName==="LINK"&&h.rel==="modulepreload"&&o(h)}).observe(document,{childList:!0,subtree:!0});function r(n){const i={};return n.integrity&&(i.integrity=n.integrity),n.referrerPolicy&&(i.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?i.credentials="include":n.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(n){if(n.ep)return;n.ep=!0;const i=r(n);fetch(n.href,i)}})();function T(e){let t=!1;const r=n=>{t=n,g(e,t)},o=()=>{y||(t=!t,g(e,t))};e.addEventListener("click",()=>o()),r(!1)}function H(e){const t=()=>{y||(M(),E())};e.addEventListener("click",()=>t())}function g(e,t){t?e.classList.add("selected"):e.classList.remove("selected")}function k(e,t){document.querySelector("#app").innerHTML=`
  <div>
  <h1 class="unselectable">Game over!</h1>
  <h2 class="unselectable">You scored ${e} point(s).</h2>
  `,t<e?(document.querySelector("#app").innerHTML+=`
    <h2>A new high score has been achieved!<h2>
    <p>The new high score is ${e} point(s).</hp>
    <p>The previous high score was ${t} point(s).</hp>
    `,t=e,localStorage.setItem("highScore",e)):document.querySelector("#app").innerHTML+=`
    <p>You can always do better then last time.</p>
    `,document.querySelector("#app").innerHTML+=`
  <button id="startButton" type="button" class="unselectable">Restart Game</button>
  <button id="tutorialButton" type="button" class="unselectable">How to play?</button>
  `,document.querySelector("#startButton").addEventListener("click",()=>S()),document.querySelector("#tutorialButton").addEventListener("click",()=>q())}function x(e){document.querySelector("#app").innerHTML=`
  <div class="titleBox">
  <h1 class="unselectable">Welcome to the game of FizzBuzz!</h1>
  <p class="unselectable">The programmers fabled test. Now a brainteaser for the wannaby flesh computers.</p>
  </div>
  <button id="startButton" type="button" class="unselectable">Start Game</button>
  <button id="tutorialButton" type="button" class="unselectable">How to play?</button>
  `,e!==0&&(document.querySelector("#app").innerHTML+=`
  <div>
  <h2 class="unselectable">Your high score is ${e} point(s)!</h2>
  </div>
  `),document.querySelector("#startButton").addEventListener("click",()=>S()),document.querySelector("#tutorialButton").addEventListener("click",()=>q())}function q(){document.querySelector("#app").innerHTML=`
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
  `,document.querySelector("#startButton").addEventListener("click",()=>S())}let B=60,I=1,l,d=[{word:"fizz",divisibleBy:3,button:void 0},{word:"buzz",divisibleBy:5,button:void 0},{word:"bizz",divisibleBy:7,button:void 0},{word:"fuzz",divisibleBy:9,button:void 0}],c=0,b=0,m=0,a=0,p=Number(localStorage.getItem("highScore"));var y=!1;let u=0;var f;let s=0;function v(e,t){for(let r=0+t;r<e+t;r++){const o=document.createElement("button");o.id=`${d[r].word}Button`,o.type="button",o.classList.add("unselectable"),o.style.margin="4px",o.textContent=d[r].word.toUpperCase(),d[r].button=o,T(o),document.querySelector("#buttonCard").appendChild(o)}}function D(){d=[{word:"fizz",divisibleBy:3,button:void 0},{word:"buzz",divisibleBy:5,button:void 0},{word:"bizz",divisibleBy:7,button:void 0},{word:"fuzz",divisibleBy:9,button:void 0}],s=0,b=0,a=0,m=0,c=0,l=I}let L;x(p);function S(){D(),document.querySelector("#app").innerHTML=`
  <div>
  <div id="timer" class="unselectable">60</div>
  <div id="numDisplay" class="unselectable">9999</div>
  <div id="buttonCard"></div>
  <button id="submitButton" type="button" class="unselectable">Submit</button>
  </div>
  <div id="currentScore" class="unselectable">Score: 0 / High Score: ${p}</div>
  <div id="strikesDisplay"><h1 class="redText"></h1></div>
  <div id="notifyUser" class="grayText">Remember, FIZZ is divisible by 3 and BUZZ by 5.</div>
  `,L=document.querySelector("#submitButton"),H(L),v(2,0),w(),z()}function z(){if(c++,c%16===0&&c<100)switch(s){case 0:s++,l+=.2,document.querySelector("#notifyUser").innerHTML="Difficulty increase! Time will degrade over multiple rounds";break;case 1:s++,v(1,2),document.querySelector("#notifyUser").innerHTML="Difficulty increase! Added BIZZ into the options. BIZZ is divisible by 7";break;case 2:s++,l+=.3,document.querySelector("#notifyUser").innerHTML="Difficulty increase! Lets kick it up a notch. Guessing time reduced.";break;case 3:s++,v(1,3),document.querySelector("#notifyUser").innerHTML="Difficulty increase! Added FUZZ into the options. FUZZ is divisible by 9";break;default:l+=.05;break}else c>=100&&s!==5&&(s=5,document.querySelector("#notifyUser").innerHTML="Difficulty MAXED! Let RNG decide the next number. I don't feel like counting anymore.");s===5?b=Math.floor(Math.pow(c,2)*Math.random()):b++,document.querySelector("#numDisplay").innerHTML=b,y=!1}function w(){let e=document.querySelector("#timer");e.style.animation="",l>B/4&&(l=l+.025*c),u=Math.floor(B/l),e.innerHTML=u,f!==void 0&&clearInterval(f),f=setInterval(()=>{u--,u==10&&(document.querySelector("#timer").style.animation="timerWarning 5s linear 1 forwards"),u==5&&(document.querySelector("#timer").style.animation="timerEnding 5s linear 1 forwards"),e.innerHTML=u,u<=0&&(clearInterval(f),M())},1e3)}function M(){if(y)return;y=!0,clearInterval(f);let e=0,t=0,r=[];for(const n of d){const i=n.button;i&&(b%n.divisibleBy==0?(t++,i.classList.contains("selected")&&(r.push(i),i.classList.add("correct"),e++)):i.classList.contains("selected")&&(r.push(i),i.classList.add("incorrect"),e--))}let o=1;if(t===e){t===4?m>0?m--:a+=Math.pow(2,t-1):t==0?a+=Math.pow(2,t):a+=Math.pow(2,t-1),document.querySelector("#numDisplay").style.color="green",document.querySelector("#currentScore").innerHTML=`Score: ${a} / High Score: ${p}`;const n=setInterval(()=>{if(o<=0){document.querySelector("#numDisplay").style.color="",clearInterval(n),z(),w();for(const i of r)i.classList.remove("correct"),i.classList.remove("incorrect");r.length=0}o--},250)}else{document.querySelector("#submitButton").classList.add("incorrect"),document.querySelector("#strikesDisplay .redText").innerHTML+="X ",m++,document.querySelector("#numDisplay").style.color="red";const n=setInterval(()=>{if(o<=0)if(document.querySelector("#numDisplay").style.color="",clearInterval(n),m>=3)k(a,p);else{z(),w();for(const i of r)i.classList.remove("correct"),i.classList.remove("incorrect");document.querySelector("#submitButton").classList.remove("incorrect")}o--},1e3)}}function E(){for(const e of d)e.button!==void 0&&T(e.button)}
