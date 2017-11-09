var Client = (function(window) {

  var socket      = null;
  var gameState   = null;

  var gameID      = null;
  var playerColor = null;
  var playerName  = null;

  var container   = null;
  var messages    = null;
  var board       = null;
  var squares     = null;

  var gameClasses = null;

  var selection   = null;

  var gameOverMessage     = null;
  var pawnPromotionPrompt = null;
  var forfeitPrompt       = null;
  var squareIDs=[];
  var wActive = true;
  var bActive = true;
  var yActive = true;
  var rActive = true;
  
   /**
   * Initialize the UI
   */
  var init = function(config) {
    gameID      = config.gameID;
    playerColor = config.playerColor;
    playerName  = config.playerName;

    container   = $('#game');
    messages    = $('#messages');
    board       = $('#board');
    squares     = board.find('.square');

    gameOverMessage     = $('#game-over');
    pawnPromotionPrompt = $('#pawn-promotion');
    forfeitPrompt       = $('#forfeit-game');
 

    gameClasses = "white black red orange pawn rook knight bishop queen king not-moved empty selected " +
                  "valid-move valid-capture valid-en-passant-capture valid-castle last-move";

    // Create socket connection
    socket = io.connect();

    // Define board based on player's perspective
    assignSquares();

    // Attach event handlers
    attachDOMEventHandlers();
    attachSocketEventHandlers();

    // Initialize modal popup windows
   // gameOverMessage.modal({show: false, keyboard: false, backdrop: 'static'});
   // pawnPromotionPrompt.modal({show: false, keyboard: false, backdrop: 'static'});
   // forfeitPrompt.modal({show: false, keyboard: false, backdrop: 'static'});

    // Join game
    socket.emit('join', gameID);
  };

  /**
   * Assign square IDs and labels based on player's perspective
   */
    var assignSquares = function() {
      var fileLables = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
      var rankLabels = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

      //Defining Square IDs for Player 1
      if (playerColor === 'white') {
          for(i=0;i<10;i++){
              for(j=0;j<26;j++){
                  squareIDs.push(fileLables[j]+rankLabels[i]);

              }
          }
      }


      //Defining Square IDs for Player 2
      if (playerColor === 'black') {
          fileLables.reverse();
          rankLabels.reverse();

          for(i=0;i<10;i++){
              for(j=0;j<26;j++){
                  squareIDs.push(fileLables[j]+rankLabels[i]);

              }
          }
      }

      //Defining Square IDs for Player 3
      if (playerColor === 'red') {
          fileLables.reverse();
          for(i=0;i<10;i++){
              for(j=0;j<26;j++){
                  squareIDs.push(fileLables[j]+rankLabels[i]);

              }
          }
     }

      //Defining Square IDs for Player 4
      if (playerColor === 'yellow') {
          rankLabels.reverse();
          for(i=0;i<10;i++){
              for(j=0;j<26;j++){
                  squareIDs.push(fileLables[j]+rankLabels[i]);

              }
          }
      }

      // Set square IDs
      squares.each(function(i) { $(this).attr('id', squareIDs[i]); });

      // Set file and rank labels
      $('.top-edge').each(function(i) { $(this).text(fileLables[i]); });
      $('.right-edge').each(function(i) { $(this).text(rankLabels[i]); });
      $('.bottom-edge').each(function(i) { $(this).text(fileLables[i]); });
      $('.left-edge').each(function(i) { $(this).text(rankLabels[i]); });

  };
    
    
  var attachDOMEventHandlers = function() {
      if (playerColor === 'white') {
      container.on('click', '.white.pawn', function(ev) {
        if (wActive) {
          highlightValidMoves('wP', ev.target);
        }
      });
      container.on('click', '.white.rook', function(ev) {
          if (wActive) {
              highlightValidMoves('wR', ev.target);
          }
      });
      container.on('click', '.white.knight', function(ev) {
        if (wActive) {
          highlightValidMoves('wN', ev.target);
        }
      });
      container.on('click', '.white.bishop', function(ev) {
        if (wActive) {
          highlightValidMoves('wB', ev.target);
        }
      });
      container.on('click', '.white.queen', function(ev) {
        if (wActive) {
          highlightValidMoves('wQ', ev.target);
        }
      });
      container.on('click', '.white.king', function(ev) {
        if (wActive) {
          highlightValidMoves('wK', ev.target);
        }
      });
    }
    
     if (playerColor === 'black') {
      container.on('click', '.black.pawn',   function(ev) {
        if (bActive) {
          highlightValidMoves('bP', ev.target);
        }
      });
      container.on('click', '.black.rook',   function(ev) {
          if (bActive) {
            highlightValidMoves('bR', ev.target);
          }
      });
      container.on('click', '.black.knight', function(ev) {
        if (bActive) {
              highlightValidMoves('bN', ev.target);
          }
      });
      container.on('click', '.black.bishop', function(ev) {
        if (bActive) {
          highlightValidMoves('bB', ev.target);
        }
      });
      container.on('click', '.black.queen',  function(ev) {
       if (bActive) {
          highlightValidMoves('bQ', ev.target);
        }
      });
      container.on('click', '.black.king',   function(ev) {
        if (bActive) {
          highlightValidMoves('bK', ev.target);
        }
      });
     }
    
          if (playerColor === 'yellow') {
          container.on('click', '.yellow.pawn',   function(ev) {
              if (yActive) {
                  highlightValidMoves('yP', ev.target);
              }
          });
          container.on('click', '.yellow.rook',   function(ev) {
              if (yActive) {
                  highlightValidMoves('yR', ev.target);
              }
          });
          container.on('click', '.yellow.knight', function(ev) {
              if (yActive) {
                  highlightValidMoves('yN', ev.target);
              }
          });
          container.on('click', '.yellow.bishop', function(ev) {
              if (yActive) {
                  highlightValidMoves('yB', ev.target);
              }
          });
          container.on('click', '.yellow.queen',  function(ev) {
              if (yActive) {
                  highlightValidMoves('yQ', ev.target);
              }
          });
          container.on('click', '.yellow.king',   function(ev) {
              if (yActive) {
                  highlightValidMoves('yK', ev.target);
              }
          });
      }
    
     };
  var attachSocketEventHandlers = function() {

    // Update UI with new game state
    socket.on('update', function(data) {
      console.log(data);
      gameState = data;
      update();
    });

    // Display an error
    socket.on('error', function(data) {
      console.log(data);
      showErrorMessage(data);
    });
  }
  
    var move = function(destinationSquare) {
    var piece = selection.color+selection.piece;
    var src   = $('#'+selection.file+selection.rank);
    var dest  = $(destinationSquare);

    clearHighlights();

    // Move piece on board
    src.removeClass(getPieceClasses(piece)).addClass('empty');
    dest.removeClass('empty').addClass(getPieceClasses(piece));


    //disable and call timer
      switch (selection.color) {
          case 'w':
              console.log(selection.color);
              wActive = false;
              console.log(wActive);
              setTimeout(function () {
                  wActive = true;
              }, 4000);
              break;
          case 'b':
              console.log(selection.color);
              bActive = false;
              console.log(wActive);
              setTimeout(function () {
                  bActive = true;
              }, 4000);
              break;
          case 'y':
              console.log(selection.color);
              yActive = false;
              console.log(wActive);
              setTimeout(function () {
                  yActive = true;
              }, 4000);
              break;
          case 'r':
              console.log(selection.color);
              rActive = false;
              console.log(wActive);
              setTimeout(function () {
                  rActive = true;
              }, 4000);
              break;
          default:
              break;
      }


    // Return move string
    return piece+selection.file+selection.rank+'-'+dest.attr('id');
  };
 
  
