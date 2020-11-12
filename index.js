var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;

var counterOn = false;

$(document).keypress(startGame);

$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);
});

$("#bt").click(timerOn);

function timer() {
  var counter = 300;
  setInterval(function() {
    counter--;
    if (counter >= 0) {
      span = document.getElementById("count");
      span.innerHTML = counter + " seconds";
    }
    if (counter === 0) {
      alert('sorry, out of time');
      clearInterval(counter);
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press 'Start' to Restart");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      startOver();
    }
    if (gamePattern[userClickedPattern.length - 1] !== userClickedPattern[userClickedPattern.length - 1]) {
      clearInterval(counter);
      counter = "-";
    }
  }, 1000);
}

function timerOn() {
  if (!counterOn) {
    timer()
    counterOn = true;
  }
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press 'Start' to Restart");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    startOver();
    // window.location.reload();
  }
}

function startGame() {
  if (!started) {
    nextSequence();
    started = true;
  }
}

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  $("#score").text("You cleared level: " + (level - 1));
  var randomNumber = Math.floor(Math.random() * 4); // Returns a random number in a range of 0-3.
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
  counterOn = false;
}

// let counter = 300000;

// setInterval(function(){
//   counter--;

//   if(counter >= 0){
//     id = document.getElementById("count");
//     id.innerHTML = counter;
//   }
// })
