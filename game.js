var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

// Keep track of game if started
var started = false;

// Level
var level = 0;

// Using jquery to detect when a key has been pressed
$(document).keypress(function () {
  if (!started) {
    // h1 title changes to level of game
    $("#level-title").text("level " + level);
    nextSequence();
    started = true;
  }
});

// Function to play sound
function playSound(name) {
  // adding audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to add animation when clicked
function animatePress(currentColor) {
  // adding class pressed and removing it too
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

// next sequence
function nextSequence() {
  // Once nextSequence() is triggered, reset userClickArray to empty array for next level
  userClickedPattern = [];

  // Increase level by 1 everytime it is called
  level++;

  // Changing heading everytime next sequence is called
  $("#level-title").text("level " + level);

  var randomNumber = 1 + Math.floor(Math.random() * 3);

  var randomChosenColour = buttonColors[randomNumber];

  gamePattern.push(randomChosenColour);

  // using jquery selecting buttons and adding animations
  $("#" + randomChosenColour)
    .fadeIn(100)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randomChosenColour);
}

// Recording user chosen sequence
$(".btn").click(function () {
  var userChosenColor = $(this).attr("id");

  userClickedPattern.push(userChosenColor);

  playSound(userChosenColor);

  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length - 1);
});

// Code to check answer against random sequence

function checkAnswer(currentLevel) {
  // If statement to check if gamePattern is same as userClickedPattern
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    // if user got most recent answer right, check if they have finished their sequence
    if (userClickedPattern.length === gamePattern.length) {
      // call nextSequence() after a 1000 millisecond delay
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    // Play sound if user got one of the answers wrong
    playSound("wrong");

    // When user gets answer wrong, background changes for 200 millisecond
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);

    // hi changes to game over
    $("#level-title").text("Game Over! Press any Key to Restart");

    startOver();
  }
}

// function to restart game
function startOver(){

  level = 0;
  gamePattern = [];
  started = false;

}