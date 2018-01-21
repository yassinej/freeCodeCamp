$(document).ready(function() {
  var steps = [];
  var userSteps = [];
  var correct = true;
  var score = 0;
  var step = 0;
  var strict = false;
  var expert = false;
  var started = false;
  var timing = 500;
  var playTimeOut;
  function displayMessage(str) {
    $("#message").html(str);
  }
  function playAudio(id) {
    var audio = document.getElementById(id);
    if (window.chrome) {
      audio.load();
    }
    audio.play();
  }
  function playBtnAudio(id) {
    var audio = document.getElementById("audio" + id);
    if (window.chrome) {
      audio.load();
    }
    audio.play();
  }
  function start() {
    if (!started) {
      started = true;
      $("#start").prop("disabled", true);
      $("#strict").prop("disabled", true);
      $("#expert").prop("disabled", true);

      displayMessage("Let's start");
      playAudio("audioStart");
      playTimeOut = setTimeout(function() {
        play();
      }, 3000);
    }
  }
  function play() {
    $("#score").html(steps.length + 1);
    addStep();
    $(".buttons").addClass("disabled");
    playStep();
    step = 0;
  }
  function reset() {
    displayMessage("Back to the start");
    steps = [];
    userSteps = [];
    score = 0;
    step = 0;
    strict = false;
    expert = false;
    started = false;
    timing = 500;

    $("#score").html(0);
    $("#expert").prop("checked", false);
    $("#strict").prop("checked", false);
    $("#0").removeClass("active0");
    $("#1").removeClass("active1");
    $("#2").removeClass("active2");
    $("#3").removeClass("active3");
    $("#start").prop("disabled", false);
    $("#strict").prop("disabled", false);
    $("#expert").prop("disabled", false);
    clearTimeout(playTimeOut);
  }
  function clickHandler(id) {
    if (!started) {
      playBtnAudio(id);
      $("#" + id).toggleClass("active" + id);
      setTimeout(function() {
        $("#" + id).toggleClass("active" + id);
      }, timing / 2);
    } else {
      playBtnAudio(id);
      $("#" + id).toggleClass("active" + id);
      setTimeout(function() {
        $("#" + id).toggleClass("active" + id);
      }, timing / 2);
      userSteps.push(id);
      if (userSteps.length === steps.length) {
        checkSteps();
      } else {
        displayMessage("Keep Going..");
      }
    }
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
  }
  function addStep() {
    var i = getRandomInt(4);
    steps.push(i.toString());
  }
  function playStep() {
    if (step < steps.length) {
      var id = "#" + steps[step];
      setTimeout(function() {
        $(id).toggleClass("active" + steps[step]);
        playBtnAudio(steps[step]);
      }, timing);
      setTimeout(function() {
        $(id).toggleClass("active" + steps[step]);
        step++;
        playStep();
      }, 2 * timing);
    } else {
      $(".buttons").removeClass("disabled");
      step = 0;
    }
  }
  function checkSteps() {
    $(".buttons").addClass("disabled");
    for (var i = 0; i < userSteps.length; i++) {
      if (userSteps[i] !== steps[i]) {
        if (strict) {
          displayMessage("You need more practice..");
          playAudio("audioStrictFail");
          setTimeout(function() {
            reset();
            $("#strict").prop("checked", true);
            strict = true;
          }, 2000);
          return;
        } else {
          displayMessage("Try Again..");
          playAudio("audioFail");
          correct = false;
          userSteps = [];
          setTimeout(function() {
            playStep();
          }, 2000);
          return;
        }
      }
    }
    if (userSteps.length === 20) {
      if (strict) {
        if (!expert) {
          displayMessage(
            "Woohoo!! You reached the max level, Try the Expert Mode!"
          );
        } else {
          displayMessage("Amazing!! You reached the TOP level!");
        }
      } else {
        if (!expert) {
          displayMessage(
            "Woohoo!! You reached the max level, Try the Expert Mode or the Strict Mode"
          );
        } else {
          displayMessage(
            "Amazing!! You reached the max level in Expert Mode. Try the Strict Mode"
          );
        }
      }
      setTimeout(function() {
        reset();
      }, 3000);
    } else {
      displayMessage("Good! Get Ready for the next level!");
      userSteps = [];
      playAudio("audioWin");
      playTimeOut = setTimeout(function() {
        play();
      }, 2000);
    }
  }
  function strictMode() {
    if (!strict) {
      strict = true;
      $("#strict").prop("checked", true);
      displayMessage("Strict Mode Enabled - No Mistakes allowed");
    } else {
      strict = false;
      $("#strict").prop("checked", false);
      displayMessage("Strict Mode Disabled - Are you a Noob?");
    }
  }
  function expertMode() {
    if (!expert) {
      expert = true;
      timing = 250;
      $("#expert").prop("checked", true);
      displayMessage("Export Mode Enabled - Shorter Notifications");
    } else {
      expert = false;
      timing = 500;
      $("#expert").prop("checked", false);
      displayMessage("Export Mode Disabled - Longer Notifications");
    }
  }

  $("#start").click(function() {
    start();
  });
  $("#reset").click(reset);
  $("#strict").click(strictMode);
  $("#expert").click(expertMode);
  $(".buttons").click(function(event) {
    clickHandler(event.target.id);
  });
  $("#score").html(0);

  console.log("Play Simon game...");
});
