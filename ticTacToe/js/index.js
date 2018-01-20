$(document).ready(function() {
  var squares = Array(9).fill(null);
  var currentPlayer = "X";
  var turn = 0;
  function displayMessage(str) {
    $("#message").html(str);
  }
  function reset() {
    console.log("resetting..");
    squares = Array(9).fill(null);
    turn = 0;
    $("button").html("");
  }
  function nextPlayer() {
    if (currentPlayer === "X") {
      currentPlayer = "O";
    } else {
      currentPlayer = "X";
    }
    console.log(currentPlayer);
  }
  function calculateWinner() {
    var lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
    for (var i = 0; i < lines.length; i++) {
      var [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return true;
      }
    }
    return false;
  }

  function clickHandler(id) {
    console.log("click", id);
    if (!squares[id]) {
      squares[id] = currentPlayer;
      turn++;
      var idQ = "#" + id;
      $(idQ).html(currentPlayer);
      if (calculateWinner()) {
        displayMessage("The winner is " + currentPlayer);
        reset();
        return;
      } else if (turn < 9) {
        nextPlayer();
        displayMessage("Player " + currentPlayer + " plays");
      } else {
        displayMessage("Draw. Play again.");
        reset();
      }
    }
  }
  $("button").click(function(e) {
    clickHandler(e.target.id);
  });
  $("#slider").click(nextPlayer);

  console.log("working..");
});
