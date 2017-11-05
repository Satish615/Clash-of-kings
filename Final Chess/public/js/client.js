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
    
    
