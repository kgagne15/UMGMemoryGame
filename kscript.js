const gameContainer = document.getElementById("game");
let count = 0; 
let score = 0; 
let identifiers = 0; 
const colorPicks = [];
const divs = []; 
const winningIDs = [];
let newGameBtn = document.getElementById('new-game');
const scoreContainer = document.querySelector('#game-score');
const lowestScoreContainer = document.querySelector('#lowest-score'); 



const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

function gameLogic(colorOne, colorTwo, idOne, idTwo) {
  
   (setTimeout(function() {

    const divisions = document.querySelectorAll('div');
    
    if (colorOne === colorTwo && idOne !== idTwo) {
        
        
        for (let division of divisions) {
          if (division.dataset.id === idOne || division.dataset.id === idTwo) {
            winningIDs.push(division.dataset.id); 
            division.style.backgroundColor = colorOne;
          }
    
        }
      } else {
        console.log('yOU LOSE!')
        for (let division of divisions) {
          if (!winningIDs.includes(division.dataset.id)) {
            division.style.backgroundColor = 'white'; 
          }
          
        }
      }
      console.log(winningIDs)
      count = 0; 
      score++; 
      colorPicks.pop();
      colorPicks.pop();  
      scoreContainer.classList.add('style'); 
    
      scoreContainer.innerText = 'Score: ' + score; 
     
      if (winningIDs.length === 10) {
        console.log('game over'); 

        console.log(localStorage.getItem('lowscore')); 

        if ((localStorage.getItem('lowscore') === null) || (score < localStorage.getItem('lowscore'))) {
          localStorage.setItem('lowscore', score);
          console.log('new low score: ', localStorage.getItem('lowscore')); 
          lowestScoreContainer.innerText = 'Lowest Score: ' + localStorage.getItem('lowscore'); 
        } else {
          lowestScoreContainer.innerText = 'Lowest Score: ' + localStorage.getItem('lowscore');  
        }
         
      }

      
      
  }, 1000)); 

  

  
}

newGameBtn.addEventListener('click', function() {
  location.reload(); 
});

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");
    divs.push(newDiv); 

    
    for (let div of divs) {
      div.dataset.id = identifiers++; 
    }
 
    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  // you can use event.target to see which element was clicked



  //CHANGES THE COLORS OF THE DIVS BASED ON CLASS
  

    console.log(event.target)
    
    if (count < 2) {
      if (event.target.classList.value === 'purple') {
          event.target.style.backgroundColor = 'purple'; 
          count++;
          colorPicks.push({color: 'purple', id: event.target.dataset.id}); 
        } else if (event.target.classList.value === 'blue') {
          event.target.style.backgroundColor = 'blue';
          count++;
          colorPicks.push({color: 'blue', id: event.target.dataset.id}); 
        } else if (event.target.classList.value === 'red') {
          event.target.style.backgroundColor = 'red';
          count++;
          colorPicks.push({color: 'red', id: event.target.dataset.id}); 
        } else if (event.target.classList.value === 'orange') {
          event.target.style.backgroundColor = 'orange';
          count++;
          colorPicks.push({color: 'orange', id: event.target.dataset.id}); 
        } else if (event.target.classList.value === 'green') {
          event.target.style.backgroundColor = 'green'; 
          count++;
          colorPicks.push({color: 'green', id: event.target.dataset.id}); 
        }
    } else {

      console.log('you can\'t click the same thing twice')
    }
  
    if (colorPicks.length === 2) {
      gameLogic(colorPicks[0].color, colorPicks[1].color, colorPicks[0].id, colorPicks[1].id); 
    }
    
   
  
}





// when the DOM loads
createDivsForColors(shuffledColors);
if (localStorage.getItem('lowscore') === null) {
  lowestScoreContainer.innerText = 'Lowest Score: '; 
} else {
  lowestScoreContainer.innerText = 'Lowest Score: ' + localStorage.getItem('lowscore'); 
}


