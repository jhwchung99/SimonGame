// Array containing button colors
buttonColors = ["red", "blue", "green", "yellow"];

// Game pattern
gamePattern = [];
// User clicked pattern
userClickedPattern = [];

// Variable that represents if the game has started or not
gameStart = false;
// Game level
level = 0;

// Takes the users key presses and then appends the id of the button to the user clicked pattern array
$(document).on("keypress", function () {
    if (gameStart === false) {
        $("#level-title").text("Level " + level);
        nextSequence();
        gameStart = true;
    }
});

// Takes the users clicks and then appends the id of the button to the user clicked pattern array
$(".btn").on("click", function () {
    var userChosenColor = this.id;
    userClickedPattern.push(userChosenColor)
    var userChosenColorIndex = userClickedPattern.length - 1;
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userChosenColorIndex);
});

// Function that starts the game over
function startOver() {
    level = 0;
    gamePattern = [];
    gameStart = false;
}

// Check the answer and reset the user's pattern if it is correct
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        } 
    } else {
        playSound("wrong");
        $("body").css("background-color", "red");
        setTimeout(function() {
            $("body").css("background-color", "#011F3F");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}

// Function to select the buttons
function nextSequence() {
    userClickedPattern = [];
    // Increase the level by 1
    level++;
    // Change the level H1 text to show the change in level
    $("#level-title").text("Level " + level);
    // Select random number
    randomNumber = Math.floor(Math.random() * 4);
    // Select a button color based off of the random number
    randomChosenColor = buttonColors[randomNumber];
    // Append the random chosen color to the game pattern array
    gamePattern.push(randomChosenColor);
    // Animate the beginning of the flash of the random chosen color
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    // Make the sound of the random chosen color
    playSound(randomChosenColor);
}

// Function that takes the name (either user or random chosen color) and plays the corresponding .mp3 sound
function playSound(name) {
    // Make the sound of the random chosen color
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    var activeButton = $("." + currentColor);
    activeButton.addClass("pressed");
    setTimeout(function() {
        activeButton.removeClass("pressed");
    }, 100);
}