document.addEventListener("DOMContentLoaded", function() {
  //Variables
  var player;
  var name = document.getElementById('name');
  var startButton = document.getElementById('start-button');
  var startBox = document.getElementById('start-game');
  var top = document.getElementById('top');
  var gameArea = document.getElementById('game-area');
  var numGuesses = 0;
  var correctGuesses = 0;
  var ballPosition, userGuess;


  //Functions
  function genBallPosition() {
    ballPosition = Math.floor(Math.random() * 3);
  }

  function incCounters() {
    numGuesses += 1
    if (ballPosition === userGuess)
      correctGuesses += 1
  }

  function calcAverage() {
    //TODO
  }

  function reset() {
    ballPosition = null;
    userGuess = null;
    gameArea.innerHTML = '';
    drawBoxes();
  }

  function reveal() {
    var userBox = document.getElementById('box-' + userGuess);
    userBox.className = userGuess === ballPosition ? 'box reveal win' : 'box reveal'
    var boxes = document.getElementsByClassName('box');
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].removeEventListener('click', makeGuess);
    }
    setTimeout( function() {
      reset();
    }, 3000)
  }

  function displayCounts() {
    //TODO
  }

  function makeGuess(e) {
    genBallPosition();
    var id = e.target.id
    var numericPart = id.split("-")[1]
    userGuess = parseInt(numericPart);
    incCounters();
    reveal();
  }


  function drawBoxes() {
    for(var i = 0; i < 3; i++) {
      var box = document.createElement('div');
      box.className = 'box';
      box.id = 'box-' + i;
      gameArea.append(box);
      box.addEventListener('click', makeGuess);
    }
  }

  function startGame() {
    player = name.value;
    startBox.className = 'hide';
    var label = document.createElement('p');
    label.innerHTML = 'Welcome ' + player;
    label.className = 'center';
    var top = document.getElementById('top');
    top.append(label);
    drawBoxes();
  }

  //Listeners
  name.addEventListener('keyup', function(event) {
    if (event.target.value !== '') {
      startButton.className = ''; 
    } else {
      startButton.className = 'hide';
    }
  })

  startButton.addEventListener('click', startGame);
})