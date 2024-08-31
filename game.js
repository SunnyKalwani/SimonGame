var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

// Function to play sound
function playSound(name) {
  // adding audio
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// Function to add animation when clicked
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");

  setTimeout(function () {
    $("#"+ currentColor).removeClass("pressed");
  }, 100);
}

// next sequence
function nextSequence() {
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
});
