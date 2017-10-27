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
    var rankLabels = [9,8, 7, 6, 5, 4, 3, 2, 1,0];
     var squareIDs = null;
    /*var squareIDs  = [
        'a9','b9','c9','d9','e9','f9','g9','h9','i9','j9','k9','l9','m9','n9','o9','p9','q9','r9','s9','t9','u9','v9','w9','x9','y9','z9',
        'a8','b8','c8','d8','e8','f8','g8','h8','i8','j8','k8','l8','m8','n8','o8','p8','q8','r8','s8','t8','u8','v8','w8','x8','y8','z8',
        'a7','b7','c7','d7','e7','f7','g7','h7','i7','j7','k7','l7','m7','n7','o7','p7','q7','r7','s7','t7','u7','v7','w7','x7','y7','z7',
        'a6','b6','c6','d6','e6','f6','g6','h6','i6','j6','k6','l6','m6','n6','o6','p6','q6','r6','s6','t6','u6','v6','w6','x6','y6','z6',
        'a5','b5','c5','d5','e5','f5','g5','h5','i5','j5','k5','l5','m5','n5','o5','p5','q5','r5','s5','t5','u5','v5','w5','x5','y5','z5',
        'a4','b4','c4','d4','e4','f4','g4','h4','i4','j4','k4','l4','m4','n4','o4','p4','q4','r4','s4','t4','u4','v4','w4','x4','y4','z4',
        'a3','b3','c3','d3','e3','f3','g3','h3','i3','j3','k3','l3','m3','n3','o3','p3','q3','r3','s3','t3','u3','v3','w3','x3','y3','z3',
        'a2','b2','c2','d2','e2','f2','g2','h2','i2','j2','k2','l2','m2','n2','o2','p2','q2','r2','s2','t2','u2','v2','w2','x2','y2','z2',
        'a1','b1','c1','d1','e1','f1','g1','h1','i1','j1','k1','l1','m1','n1','o1','p1','q1','r1','s1','t1','u1','v1','w1','x1','y1','z1',
        'a0','b0','c0','d0','e0','f0','g0','h0','i0','j0','k0','l0','m0','n0','o0','p0','q0','r0','s0','t0','u0','v0','w0','x0','y0','z0'

    ];*/
    

   //Defining Board position for Player 1
    if (playerColor === 'white') {
     // fileLabels.toString();
     // rankLabels.toString();
      for(i=9;i>=0;i--){
           for(j=0;j<26;j++){
              squareIDs.push(fileLabels[j]+rankLabels[i]);
           }
      }
    
    }
//Defining Board position for Player 2
    if (playerColor === 'black') {
      fileLabels.reverse();
      rankLabels.reverse();
      //squareIDs.reverse();
      for(i=0;i<10;i++){
           for(j=25;j<=0;j--){
              squareIDs.push(fileLabels[j]+rankLabels[i]);
           }
      }
    
    }
//Defining Board position for Player 3
    if (playerColor === 'red') {
          fileLabels.reverse();
         // rankLabels.toString();
          //squareIDs.reverse();
          for(i=9;i>=0;i--){
             for(j=25;j>=0;j--){
                squareIDs.push(fileLabels[j]+rankLabels[i]);
             }
          }
       
    }
//Defining Board position for Player 4
      if (playerColor === 'yellow') {
          //fileLabels.reverse();
         // fileLabels.toString();
          rankLabels.reverse();
          //squareIDs.reverse();
          for(i=0;i<10;i++){
             for(j=0;j<26;j++){
                squareIDs.push(fileLabels[j]+rankLabels[i]);
             }
          }
         

      }

    // Set file and rank labels
    $('.top-edge').each(function(i) { $(this).text(fileLabels[i]); });
    $('.right-edge').each(function(i) { $(this).text(rankLabels[i]); });
    $('.bottom-edge').each(function(i) { $(this).text(fileLabels[i]); });
    $('.left-edge').each(function(i) { $(this).text(rankLabels[i]); });

    // Set square IDs
    squares.each(function(i) { $(this).attr('id', squareIDs[i]); });
  };

  /**
   * Attach DOM event handlers
   */
  var attachDOMEventHandlers = function() {

    // Highlight valid moves for white pieces
    if (playerColor === 'white') {
      container.on('click', '.white.pawn', function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('wP', ev.target);
        }
      });
      container.on('click', '.white.rook', function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('wR', ev.target);
        }
      });
      container.on('click', '.white.knight', function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('wN', ev.target);
        }
      });
      container.on('click', '.white.bishop', function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('wB', ev.target);
        }
      });
      container.on('click', '.white.queen', function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('wQ', ev.target);
        }
      });
      container.on('click', '.white.king', function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('wK', ev.target);
        }
      });
    }

    // Highlight valid moves for black pieces
    if (playerColor === 'black') {
      container.on('click', '.black.pawn',   function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('bP', ev.target);
        }
      });
      container.on('click', '.black.rook',   function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('bR', ev.target);
        }
      });
      container.on('click', '.black.knight', function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('bN', ev.target);
        }
      });
      container.on('click', '.black.bishop', function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('bB', ev.target);
        }
      });
      container.on('click', '.black.queen',  function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('bQ', ev.target);
        }
      });
      container.on('click', '.black.king',   function(ev) {
        if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
          highlightValidMoves('bK', ev.target);
        }
      });
    }
      // Highlight valid moves for black pieces
      if (playerColor === 'yellow') {
          container.on('click', '.yellow.pawn',   function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('yP', ev.target);
              }
          });
          container.on('click', '.yellow.rook',   function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('yR', ev.target);
              }
          });
          container.on('click', '.yellow.knight', function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('yN', ev.target);
              }
          });
          container.on('click', '.yellow.bishop', function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('yB', ev.target);
              }
          });
          container.on('click', '.yellow.queen',  function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('yQ', ev.target);
              }
          });
          container.on('click', '.yellow.king',   function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('yK', ev.target);
              }
          });
      }
      // Highlight valid moves for black pieces
      if (playerColor === 'red') {
          container.on('click', '.red.pawn',   function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor)
              {
                  highlightValidMoves('rP', ev.target);
              }
          });
          container.on('click', '.red.rook',   function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('rR', ev.target);
             }
          });
          container.on('click', '.red.knight', function(ev) {
             if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('rN', ev.target);
              }
          });
          container.on('click', '.red.bishop', function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('rB', ev.target);
              }
          });
          container.on('click', '.red.queen',  function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('rQ', ev.target);
              }
          });
          container.on('click', '.red.king',   function(ev) {
              if (gameState.activePlayer && gameState.activePlayer.color === playerColor) {
                  highlightValidMoves('rK', ev.target);
              }
          });
      }

    // Clear all move highlights
    container.on('click', '.empty', function(ev) {
      clearHighlights();
    });

    // Perform a regular move
    container.on('click', '.valid-move', function(ev) {
      var m = move(ev.target);

      // Test for pawn promotion
      if (/wP....8/.test(m) || /bP....1/.test(m)||/yP....8/.test(m)||/rP....1/.test(m)) {
        showPawnPromotionPrompt(function(p) {
          // replace piece
          messages.empty();
          socket.emit('move', {gameID: gameID, move: m+p});
        });
      } else {
        messages.empty();
        socket.emit('move', {gameID: gameID, move: m});
      }
    });

    // Perform a regular capture
    container.on('click', '.valid-capture', function(ev) {
      var m = capture(ev.target);

      // Test for pawn promotion
        if (/wP....8/.test(m) || /bP....1/.test(m)||/yP....8/.test(m)||/rP....1/.test(m)) {
        showPawnPromotionPrompt(function(p) {
          // replace piece
          messages.empty();
          socket.emit('move', {gameID: gameID, move: m+p});
        });
      } else {
        messages.empty();
        socket.emit('move', {gameID: gameID, move: m});
      }
    });

    // Perform an en passant capture
    container.on('click', '.valid-en-passant-capture', function(ev) {
      var m = capture(ev.target);
      messages.empty();
      socket.emit('move', {gameID: gameID, move: m+'ep'});
    });

    // Perform a castle
    container.on('click', '.valid-castle', function(ev) {
      var m = castle(ev.target);
      messages.empty();
      socket.emit('move', {gameID: gameID, move: m});
    });

    // Forfeit game
    container.on('click', '#forfeit', function(ev) {
      showForfeitPrompt(function(confirmed) {
        if (confirmed) {
          messages.empty();
          socket.emit('forfeit', gameID);
        }
      });
    });
  };

  /**
   * Attach Socket.IO event handlers
   */
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
  };

  /**
   * Highlight valid moves for the selected piece
   */
  var highlightValidMoves = function(piece, selectedSquare) {
    var square = $(selectedSquare);
    var move   = null;

    // Set selection object
    selection = {
      color: piece[0],
      piece: piece[1],
      file:  square.attr('id')[0],
      rank:  square.attr('id')[1]
    };

    // Highlight the selected square
    squares.removeClass('selected');
    square.addClass('selected');

    // Highlight any valid moves
    squares.removeClass('valid-move valid-capture valid-en-passant-capture valid-castle');
    for (var i=0; i<gameState.validMoves.length; i++) {
      move = gameState.validMoves[i];

      if (move.type === 'move') {
        if (move.pieceCode === piece && move.startSquare === square.attr('id')) {
          $('#'+move.endSquare).addClass('valid-move');
        }
      }

      if (move.type === 'capture') {
        if (move.pieceCode === piece && move.startSquare === square.attr('id')) {
          if (move.captureSquare === move.endSquare) {
            $('#'+move.endSquare).addClass('valid-capture');
          } else {
            $('#'+move.endSquare).addClass('valid-en-passant-capture');
          }
        }
      }

      if (move.type === 'castle') {
        if (move.pieceCode === piece) {
          if (move.pieceCode[0] === 'w' && move.boardSide === 'queen') {
            $('#c1').addClass('valid-castle');
          }
          if (move.pieceCode[0] === 'w' && move.boardSide === 'king') {
            $('#g1').addClass('valid-castle');
          }
          if (move.pieceCode[0] === 'b' && move.boardSide === 'queen') {
            $('#c8').addClass('valid-castle');
          }
          if (move.pieceCode[0] === 'b' && move.boardSide === 'king') {
            $('#g8').addClass('valid-castle');
          }
        }
      }
    }
  };

  /**
   * Clear valid move highlights
   */
  var clearHighlights = function() {
    squares.removeClass('selected');
    squares.removeClass('valid-move');
    squares.removeClass('valid-capture');
    squares.removeClass('valid-en-passant-capture');
    squares.removeClass('valid-castle');
  };

  /**
   * Move selected piece to destination square
   */
  var move = function(destinationSquare) {
    var piece = selection.color+selection.piece;
    var src   = $('#'+selection.file+selection.rank);
    var dest  = $(destinationSquare);

    clearHighlights();

    // Move piece on board
    src.removeClass(getPieceClasses(piece)).addClass('empty');
    dest.removeClass('empty').addClass(getPieceClasses(piece));

    // Return move string
    return piece+selection.file+selection.rank+'-'+dest.attr('id');
  };

  /**
   * Move selected piece to destination square and capture an opponents piece
   */
  var capture = function(destinationSquare) {
    var piece = selection.color+selection.piece;
    var src   = $('#'+selection.file+selection.rank);
    var dest  = $(destinationSquare);
    //var dest_color = "w";

    clearHighlights();

    // Move piece on board
    src.removeClass(getPieceClasses(piece)).addClass('empty');
    /*if(selection.color === "w" ){
      dest_color = "b"
    }*/
    dest.removeClass(gameClasses);
        //.addClass(getPieceClasses(dest_color+selection.piece));
      //addClass(getPieceClasses(piece));

    // Return move string
    return piece+selection.file+selection.rank+'x'+dest.attr('id');
  };

  /**
   * Castle the selected king
   */
  var castle = function(destinationSquare) {
    var moveString = '';

    clearHighlights();

    switch (destinationSquare.id) {

      // White queenside castle
      case 'c1':
        $('e1').removeClass(gameClasses).addClass('empty');
        $('c1').removeClass('empty').addClass(getPieceClasses('wK'));
        $('a1').removeClass(gameClasses).addClass('empty');
        $('d1').removeClass('empty').addClass(getPieceClasses('wR'));
        moveString = 'wK0-0-0';
        break;

      // White kingside castle
      case 'g1':
        $('e1').removeClass(gameClasses).addClass('empty');
        $('g1').removeClass('empty').addClass(getPieceClasses('wK'));
        $('h1').removeClass(gameClasses).addClass('empty');
        $('f1').removeClass('empty').addClass(getPieceClasses('wR'));
        moveString = 'wK0-0';
        break;

      // Black queenside castle
      case 'c8':
        $('e8').removeClass(gameClasses).addClass('empty');
        $('c8').removeClass('empty').addClass(getPieceClasses('bK'));
        $('a8').removeClass(gameClasses).addClass('empty');
        $('d8').removeClass('empty').addClass(getPieceClasses('bR'));
        moveString = 'bK0-0-0';
        break;

      // Black kingside castle
      case 'g8':
        $('e8').removeClass(gameClasses).addClass('empty');
        $('g8').removeClass('empty').addClass(getPieceClasses('bK'));
        $('h8').removeClass(gameClasses).addClass('empty');
        $('f8').removeClass('empty').addClass(getPieceClasses('bR'));
        moveString = 'bK0-0';
        break;
    }

    return moveString;
  }

  /**
   * Update UI from game state
   */
  var update = function() {
    var you, opponent = null;

    var container, name, status, captures = null;

    // Update player info
    for (var i=0; i<gameState.players.length; i++) {

      // Determine if player is you or opponent
      if (gameState.players[i].color === playerColor) {
        you = gameState.players[i];
        container = $('#you');
      }
      else if (gameState.players[i].color !== playerColor) {
        opponent = gameState.players[i];
        container = $('#opponent');
      }

      name     = container.find('strong');
      status   = container.find('.status');
      captures = container.find('ul');

      // Name
      if (gameState.players[i].color) {
        name.text(gameState.players[i].color);
      }

      // Active Status
      container.removeClass('active-player');
      if (gameState.activePlayer && gameState.activePlayer.color === gameState.players[i].color) {
        container.addClass('active-player');
      }

      // Check Status
      status.removeClass('label label-danger').text('');
      if (gameState.players[i].inCheck) {
        status.addClass('label label-danger').text('Check');
      }

      // Captured Pieces
      captures.empty();
      for (var j=0; j<gameState.capturedPieces.length; j++) {
        if (gameState.capturedPieces[j][0] !== gameState.players[i].color[0]) {
          captures.append('<li class="'+getPieceClasses(gameState.capturedPieces[j])+'"></li>');
        }
      }
    }

    // Update board
    for (var sq in gameState.board) {
      $('#'+sq).removeClass(gameClasses).addClass(getPieceClasses(gameState.board[sq]));
    }

    // Highlight last move
    if (gameState.lastMove) {
      if (gameState.lastMove.type === 'move' || gameState.lastMove.type === 'capture') {
        $('#'+gameState.lastMove.startSquare).addClass('last-move');
        $('#'+gameState.lastMove.endSquare).addClass('last-move');
      }
      else if (gameState.lastMove.type === 'castle') {
        if (gameState.lastMove.pieceCode === 'wK' && gameState.lastMove.boardSide === 'queen') {
          $('#e1').addClass('last-move');
          $('#c1').addClass('last-move');
        }
        if (gameState.lastMove.pieceCode === 'wK' && gameState.lastMove.boardSide === 'king') {
          $('#e1').addClass('last-move');
          $('#g1').addClass('last-move');
        }
        if (gameState.lastMove.pieceCode === 'bK' && gameState.lastMove.boardSide === 'queen') {
          $('#e8').addClass('last-move');
          $('#c8').addClass('last-move');
        }
        if (gameState.lastMove.pieceCode === 'bK' && gameState.lastMove.boardSide === 'king') {
          $('#e8').addClass('last-move');
          $('#g8').addClass('last-move');
        }
      }
    }

    // Test for checkmate
    if (gameState.status === 'checkmate') {
      if (opponent.inCheck) { showGameOverMessage('checkmate-win');  }
      if (you.inCheck)      { showGameOverMessage('checkmate-lose'); }
    }

    // Test for stalemate
    if (gameState.status === 'stalemate') { showGameOverMessage('stalemate'); }

    // Test for forfeit
    if (gameState.status === 'forfeit') {
      if (opponent.forfeited) { showGameOverMessage('forfeit-win');  }
      if (you.forfeited)      { showGameOverMessage('forfeit-lose'); }
    }
  };

  /**
   * Display an error message on the page
   */
  var showErrorMessage = function(data) {
    var msg, html = '';

    if (data == 'handshake unauthorized') {
      msg = 'Client connection failed';
    } else {
      msg = data.message;
    }

    html = '<div class="alert alert-danger">'+msg+'</div>';
    messages.append(html);
  };

  /**
   * Display the "Game Over" window
   */
  var showGameOverMessage = function(type) {
    var header = gameOverMessage.find('h2');

    // Set the header's content and CSS classes
    header.removeClass('alert-success alert-danger alert-warning');
    switch (type) {
      case 'checkmate-win'  : header.addClass('alert-success').text('Checkmate'); break;
      case 'checkmate-lose' : header.addClass('alert-danger').text('Checkmate'); break;
      case 'forfeit-win'    : header.addClass('alert-success').text('Your opponent has forfeited the game'); break;
      case 'forfeit-lose'   : header.addClass('alert-danger').text('You have forfeited the game'); break;
      case 'stalemate'      : header.addClass('alert-warning').text('Stalemate'); break;
    }

    gameOverMessage.modal('show');
  };

  /**
   * Display the "Pawn Promotion" prompt
   */
  var showPawnPromotionPrompt = function(callback) {

    // Set the pieces' color to match the player's color
    pawnPromotionPrompt.find('label').removeClass('black white').addClass(playerColor);

    // Temporarily attach click handler for the Promote button, note the use of .one()
    pawnPromotionPrompt.one('click', 'button', function(ev) {
      var selection = pawnPromotionPrompt.find("input[type='radio'][name='promotion']:checked").val();
      callback('p'+selection);
      pawnPromotionPrompt.modal('hide');
    });

    pawnPromotionPrompt.modal('show');
  };

  /**
   * Display the "Forfeit Game" confirmation prompt
   */
  var showForfeitPrompt = function(callback) {

    // Temporarily attach click handler for the Cancel button, note the use of .one()
    forfeitPrompt.one('click', '#cancel-forfeit', function(ev) {
      callback(false);
      forfeitPrompt.modal('hide');
    });

    // Temporarily attach click handler for the Confirm button, note the use of .one()
    forfeitPrompt.one('click', '#confirm-forfeit', function(ev) {
      callback(true);
      forfeitPrompt.modal('hide');
    });

    forfeitPrompt.modal('show');
  };

  /**
   * Get the corresponding CSS classes for a given piece
   */
  var getPieceClasses = function(piece) {
    switch (piece) {
      case 'bP'  : return 'black pawn';
      case 'bP_' : return 'black pawn not-moved';
      case 'bR'  : return 'black rook';
      case 'bR_' : return 'black rook not-moved';
      case 'bN'  : return 'black knight';
      case 'bN_' : return 'black knight not-moved';
      case 'bB'  : return 'black bishop';
      case 'bB_' : return 'black bishop not-moved';
      case 'bQ'  : return 'black queen';
      case 'bQ_' : return 'black queen not-moved';
      case 'bK'  : return 'black king';
      case 'bK_' : return 'black king not-moved';
      case 'wP'  : return 'white pawn';
      case 'wP_' : return 'white pawn not-moved';
      case 'wR'  : return 'white rook';
      case 'wR_' : return 'white rook not-moved';
      case 'wN'  : return 'white knight';
      case 'wN_' : return 'white knight not-moved';
      case 'wB'  : return 'white bishop';
      case 'wB_' : return 'white bishop not-moved';
      case 'wQ'  : return 'white queen';
      case 'wQ_' : return 'white queen not-moved';
      case 'wK'  : return 'white king';
      case 'wK_' : return 'white king not-moved';
        case 'rP'  : return 'red pawn';
        case 'rP_' : return 'red pawn not-moved';
        case 'rR'  : return 'red rook';
        case 'rR_' : return 'red rook not-moved';
        case 'rN'  : return 'red knight';
        case 'rN_' : return 'red knight not-moved';
        case 'rB'  : return 'red bishop';
        case 'rB_' : return 'red bishop not-moved';
        case 'rQ'  : return 'red queen';
        case 'rQ_' : return 'red queen not-moved';
        case 'rK'  : return 'red king';
        case 'rK_' : return 'red king not-moved';
        case 'yP'  : return 'yellow pawn';
        case 'yP_' : return 'yellow pawn not-moved';
        case 'yR'  : return 'yellow rook';
        case 'yR_' : return 'yellow rook not-moved';
        case 'yN'  : return 'yellow knight';
        case 'yN_' : return 'yellow knight not-moved';
        case 'yB'  : return 'yellow bishop';
        case 'yB_' : return 'yellow bishop not-moved';
        case 'yQ'  : return 'yellow queen';
        case 'yQ_' : return 'yellow queen not-moved';
        case 'yK'  : return 'yellow king';
        case 'yK_' : return 'yellow king not-moved';
      default    : return 'empty';
    }
  };

  return init;

}(window));
