// Set point counter variables for both players, turn counter
var xCoords = [];
var oCoords = [];
var turn = 0;

$(document).ready(function() {


  $('#generate-board-button').on('click', function() {
    boardSize = parseInt($('#boardSize').val());
    generateBoard(boardSize);
  });

  // Generate board based on user input
  function generateBoard(size) {
    $('#game').append("<table cellpadding=\'0\' cellspacing=\'0\' id=\'tictactoe-board\'></table>")
    var board = $('#tictactoe-board');
    for (i = 0; i < size + 1; i++) {
      board.append("<tr id=\'row-" + (i+1) + "\'></tr>");
      var row = $('#row-' + i);
      for (j = 0; j < size; j++) {
        row.append("<td id=\'column-" + (i - 1) + (j) + "\'></td>'")
      };
    };
    // Set cell size to a percentage of the total parent width
    var parentWidth = $('#game').width();
    $('td').width(parentWidth / size).height(parentWidth / size)
    var cellSize = $('td').width()
    $('td').css('font-size', (cellSize - (cellSize*0.25)))
    $('#setup').remove();

    // Add player markers on table click, increment turn counter,
    // Push coordinates to player array
    $('td').one('click', function() {
      var self = $(this)

      if (turn % 2) {
        self.html('O');
        var coords = [self.attr('id').slice(-2, -1), self.attr('id').slice(-1)]
        oCoords.push(coords);
        console.log(coords);
        self.addClass('o')
      } else {
        self.html('X');
        var coords = [self.attr('id').slice(-2, -1), self.attr('id').slice(-1)]
        xCoords.push(coords);
        console.log(coords);
        self.addClass('x')
      }

      turn++;

      // Check to see if any game over conditions exist
        checkForGameOver();

    });
  }


});

function checkForGameOver() {

  // Sort x and y coordinates from each player array
  var winner = false;
  function parseCoordinates(playerCoordinates) {
    for (i = 0; i < playerCoordinates.length; i++) {
      xComparison.push(playerCoordinates[i][0]);
      yComparison.push(playerCoordinates[i][1]);
      if (playerCoordinates[i][0] === playerCoordinates[i][1]) {
        xyComparison.push(true);
      } else {
        xyComparison.push(false);
      }
      if (playerCoordinates[i][0] == ((boardSize-1) - playerCoordinates[i][1])) {
        yxComparison.push(true);
      } else {
        yxComparison.push(false);
      }
    };
  }

  // Check to see if x coordinates match
  function compareXCoordinates(playerName) {
    for (i = 0; i < xComparison.length; i++ ) {
      if (xComparison.filter(function(coordinate) {
        return coordinate === xComparison[i]
      }).length === boardSize) {
        alert(playerName + ' wins!');
        winner = true;
        endGame();
        break;
      }
    }
  }

  // Check to see if y coordinates match
  function compareYCoordinates(playerName) {
    for (i = 0; i < yComparison.length; i++ ) {
      if (yComparison.filter(function(coordinate) {
        return coordinate === yComparison[i]
      }).length === boardSize) {
        alert(playerName + ' wins!');
        winner = true;
        endGame();
        break;
      }
    }
  }

  // Check for x === y
  function compareXYCoordinates(playerName) {
    for (i = 0; i < xyComparison.length; i++ ) {
      if (xyComparison.filter(function(coordinate) {
        return coordinate === true
      }).length === boardSize) {
        alert(playerName + ' wins!');
        winner = true;
        endGame();
        break;
      }
    }
  }

  // Check for x === (boardSize - y)
  function compareYXCoordinates(playerName) {
    for (i = 0; i < yxComparison.length; i++ ) {
      if (yxComparison.filter(function(coordinate) {
        return coordinate === true
      }).length === boardSize) {
        alert(playerName + ' wins!');
        winner = true;
        endGame();
        break;
      }
    }
  }

  // Compare win conditons for each player
  function checkWinConditions(playerName) {
    if (winner === false) {
      compareXCoordinates(playerName);
    }
    if (winner === false) {
      compareYCoordinates(playerName);
    }
    if (winner === false) {
      compareXYCoordinates(playerName);
    }
    if (winner === false) {
      compareYXCoordinates(playerName);
    }
  }

  // Determine if X wins
  if (xCoords.length >= boardSize) {
    var playerName = "X"
    var xComparison = [];
    var yComparison = [];
    var xyComparison = [];
    var yxComparison = [];

    parseCoordinates(xCoords);
    checkWinConditions(playerName)

  }

// Determine if O wins
  if (oCoords.length >= boardSize) {
    var playerName = "O"
    var xComparison = [];
    var yComparison = [];
    var xyComparison = [];
    var yxComparison = [];

    parseCoordinates(oCoords);
    checkWinConditions(playerName);

  }

// Return a tie
  if (turn === Math.pow(boardSize, 2) && winner === false) {
    alert('It\'s a tie!');
    endGame();
  }

  // Turn off listeners, ask if player wants to play again
  function endGame() {
    $('td').off();
    var playAgain = confirm('Want to play again?');
    if (playAgain) {
      location.reload();
    };
  }
};
