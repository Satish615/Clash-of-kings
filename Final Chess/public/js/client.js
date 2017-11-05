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
    var fileLabels = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
    var filelabels2 = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    var rankLabels = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0];
    
     //Defining Board position for Player 1
    if (playerColor === 'white') {

      for(i=0;i<10;i++){
           for(j=0;j<26;j++){
             squareIDs.push(filelabels2[j]+rankLabels[i]);
              
           }
      }
      // Set square IDs
      squares.each(function(i) { $(this).attr('id', squareIDs[i]); });
      
    }
   
  
   //Defining Board position for Player 2
    if (playerColor === 'black') {
      fileLabels.reverse();
      filelabels2.reverse();
      rankLabels.reverse();
     
    for(i=0;i<10;i++){
           for(j=0;j<26;j++){
              squareIDs.push(filelabels2[j]+rankLabels[i]);
              
           }
      }
      // Set square IDs
      squares.each(function(i) { $(this).attr('id', squareIDs[i]); });

    }
    
//Defining Board position for Player 3
    if (playerColor === 'red') {
          filelabels2.reverse();
          fileLabels.reverse();
          for(i=0;i<10;i++){
             for(j=0;j<26;j++){
                squareIDs.push(filelabels2[j]+rankLabels[i]);
                
             }
          }
      // Set square IDs
        squares.each(function(i) { $(this).attr('id', squareIDs[i]); });
    }
    
//Defining Board position for Player 4
      if (playerColor === 'yellow') {
          rankLabels.reverse();
          for(i=0;i<10;i++){
             for(j=0;j<26;j++){
                squareIDs.push(filelabels2[j]+rankLabels[i]);
                
             }
          }
         // Set square IDs
         squares.each(function(i) { $(this).attr('id', squareIDs[i]); });

      }

    // Set file and rank labels
    $('.top-edge').each(function(i) { $(this).text(fileLabels[i]); });
    $('.right-edge').each(function(i) { $(this).text(rankLabels[i]); });
    $('.bottom-edge').each(function(i) { $(this).text(fileLabels[i]); });
    $('.left-edge').each(function(i) { $(this).text(rankLabels[i]); });
   
  };
    
    
