var GetMovesForPlayer = function(){
    this.chessPiece = "";
}

GetMovesForPlayer.prototype = {
    setStrategy: function(chessPiece){
        this.chessPiece = chessPiece;
    },
    
    

    getMoves: function(piece, square, board){
        return this.piece.getMoves(piece, square, board);
    }
};

var Pawn = function(piece, square, board, lastMove, includeUnsafe){
    this.getMoves = function(piece, square, board){
  
  var moves = [];

  var moveTransforms, captureTransforms = [];

  if (piece[0] === 'w') {
    moveTransforms    = (piece[2] === '_') ? [{x:+0, y:+1}, {x:+0, y:+2}] : [{x:+0, y:+1}];
    captureTransforms = [{x:+1, y:+1}, {x:-1, y:+1}];
  }

  if (piece[0] === 'b') {
      moveTransforms = (piece[2] === '_') ? [{x: +0, y: -1}, {x: +0, y: -2}] : [{x: +0, y: -1}];
      captureTransforms = [{x: +1, y: -1}, {x: -1, y: -1}];
  }
  if (piece[0] === 'r') {
          moveTransforms    = (piece[2] === '_') ? [{x:+0, y:+1}, {x:+0, y:+2}] : [{x:+0, y:+1}];
          captureTransforms = [{x:+1, y:+1}, {x:-1, y:+1}];
      }

  if (piece[0] === 'y') {
      moveTransforms = (piece[2] === '_') ? [{x: +0, y: -1}, {x: +0, y: -2}] : [{x: +0, y: -1}];
      captureTransforms = [{x: +1, y: -1}, {x: -1, y: -1}];
  }

  var destination, move, capture = null;

  // Loop moves
  for (var i=0; i<moveTransforms.length; i++) {

    // Get destination square for move
    destination = transformSquare(square, moveTransforms[i]);
    if (!destination) { break; }

    // If destination square is empty
    if (board[destination] === null) {
      move = {type: 'move', pieceCode: piece.substring(0,2), startSquare: square, endSquare: destination};
      moves.push(move);
    }
    // If destination square is occupied
    else {
      break;
    }
  }

  // Loop captures
  for (var i=0; i<captureTransforms.length; i++) {

    // Get destination square for capture
    destination = transformSquare(square, captureTransforms[i]);
    if (!destination) { //continue;
        break; }

    // If destination square is empty
    if (board[destination] === null) {

      // Get prerequisite move for a valid en passant capture
      if (piece[0] === 'w') {
        epPreReq = {
          type        : 'move',
          pieceCode   : 'bP',
          startSquare : destination[0] + '7',
          endSquare   : destination[0] + square[1]
        };
      }
      if (piece[0] === 'b') {
        epPreReq = {
          type        : 'move',
          pieceCode   : 'wP',
          startSquare : destination[0]+'2',
          endSquare   : destination[0] + square[1]
        };
      }
        if (piece[0] === 'r') {
            epPreReq = {
                type        : 'move',
                pieceCode   : 'bP',
                startSquare : destination[0] + '7',
                endSquare   : destination[0] + square[1]
            };
        }
        if (piece[0] === 'y') {
            epPreReq = {
                type        : 'move',
                pieceCode   : 'rP',
                startSquare : destination[0] + '7',
                endSquare   : destination[0] + square[1]
            };
        }

      // If last move matches the prerequisite, then we have a valid en passant capture
      if (_.isEqual(lastMove, epPreReq)) {
        capture = {
          type          : 'capture',
          pieceCode     : piece.substring(0,2),
          startSquare   : square,
          endSquare     : destination,
          captureSquare : destination[0]+square[1]
        };

        moves.push(capture);
      }
    }

    // If destination square is occupied by foe
    else if (board[destination][0] !== piece[0]) {
      capture = {
        type          : 'capture',
        pieceCode     : piece.substring(0,2),
        startSquare   : square,
        endSquare     : destination,
        captureSquare : destination
      };
      moves.push(capture);
    }
    // If destination square is occupied by friend
    else {
      // Do nothing
    }
  }
  return moves;
    }
};

var Rook = function(piece, square, board, includeUnsafe){
    this.getMoves = function(piece, square, board){
        var moves = [];

  var transforms = {
    n: [{x:0, y:+1}, {x:0, y:+2}, {x:0, y:+3}, {x:0, y:+4}, {x:0, y:+5}, {x:0, y:+6}, {x:0, y:+7},
        {x:0, y:+8}, {x:0, y:+8}, {x:0, y:+9}],

    e: [{x:+1, y:0}, {x:+2, y:0}, {x:+3, y:0}, {x:+4, y:0}, {x:+5, y:0}, {x:+6, y:0}, {x:+7, y:0},
        {x:+8, y:0}, {x:+9, y:0}, {x:+10, y:0}, {x:+11, y:0}, {x:+12, y:0}, {x:+13, y:0}, {x:+14, y:0},
        {x:+15, y:0}, {x:+16, y:0}, {x:+17, y:0}, {x:+18, y:0}, {x:+19, y:0}, {x:+20, y:0}, {x:+21, y:0},
        {x:+22, y:0}, {x:+23, y:0}, {x:+24, y:0}, {x:+25, y:0}],


    s: [{x:0, y:-1}, {x:0, y:-2}, {x:0, y:-3}, {x:0, y:-4}, {x:0, y:-5}, {x:0, y:-6}, {x:0, y:-7} ,{x:0, y:-8}, {x:0, y:-9}],
    w: [{x:-1, y:0}, {x:-2, y:0}, {x:-3, y:0}, {x:-4, y:0}, {x:-5, y:0}, {x:-6, y:0}, {x:-7, y:0},
        {x:-8, y:0}, {x:-9, y:0}, {x:-10, y:0}, {x:-11, y:0}, {x:-12, y:0}, {x:-13, y:0}, {x:-14, y:0},
        {x:-15, y:0}, {x:-16, y:0}, {x:-17, y:0}, {x:-18, y:0}, {x:-19, y:0}, {x:-20, y:0}, {x:-21, y:0},
        {x:-22, y:0}, {x:-23, y:0}, {x:-24, y:0}, {x:-25, y:0}]
  };

  var destination, move = null;

  // Loop all moves
  for (var group in transforms) {
    for (var i=0; i<transforms[group].length; i++) {

      // Get destination square for move
      destination = transformSquare(square, transforms[group][i]);
      if (!destination) { break; }

      // If destination square is empty
      if (board[destination] === null) {
        move = {
          type        : 'move',
          pieceCode   : piece.substring(0,2),
          startSquare : square,
          endSquare   : destination
        };
      moves.push(move);
      }
      // If destination square is occupied by foe
      else if (board[destination][0] !== piece[0]) {
        move = {
          type          : 'capture',
          pieceCode     : piece.substring(0,2),
          startSquare   : square,
          endSquare     : destination,
          captureSquare : destination
        };
          moves.push(move);
        break;
      }
      // If destination square is occupied by friend
      else {
        break;
      }
    }
  }

  return moves;
    }
};

var Knight = function(piece, square, board, lastMove, includeUnsafe){
    this.getMoves = function(piece, square, board){
        var moves = [];

  var transforms = [
    {x:+1, y:+2},
    {x:+2, y:+1},
    {x:+2, y:-1},
    {x:+1, y:-2},
    {x:-1, y:-2},
    {x:-2, y:-1},
    {x:-2, y:+1},
    {x:-1, y:+2}
  ];

  var destination, move = null;

  // Loop all moves
  for (var i=0; i<transforms.length; i++) {

    // Get destination square for move
    destination = transformSquare(square, transforms[i]);
    if (!destination) { continue; }

    // If destination square is empty
    if (board[destination] === null) {
      move = {
        type        : 'move',
        pieceCode   : piece.substring(0,2),
        startSquare : square,
        endSquare   : destination
      };
        moves.push(move);
    }
    // If destination square is occupied by foe
    else if (board[destination][0] !== piece[0]) {
      move = {
        type          : 'capture',
        pieceCode     : piece.substring(0,2),
        startSquare   : square,
        endSquare     : destination,
        captureSquare : destination
      };
     // if (includeUnsafe || isMoveSafe(move, board)) {
         moves.push(move); //}
    }
    // If destination square is occupied by friend
    else {
      // Do nothing
    }
  }

  return moves;
    }
};

var Bishop = function(piece, square, board, lastMove, includeUnsafe){
    this.getMoves = function(piece, square, board){
        var moves = [];

  var transforms = {
    ne: [{x:+1, y:+1}, {x:+2, y:+2}, {x:+3, y:+3}, {x:+4, y:+4}, {x:+5, y:+5}, {x:+6, y:+6}, {x:+7, y:+7},{x:+8, y:+8},{x:+9, y:+9}],
    se: [{x:+1, y:-1}, {x:+2, y:-2}, {x:+3, y:-3}, {x:+4, y:-4}, {x:+5, y:-5}, {x:+6, y:-6}, {x:+7, y:-7},{x:+8, y:-8},{x:+9, y:-9}],
    sw: [{x:-1, y:-1}, {x:-2, y:-2}, {x:-3, y:-3}, {x:-4, y:-4}, {x:-5, y:-5}, {x:-6, y:-6}, {x:-7, y:-7},{x:-8, y:-8},{x:-9, y:-9}],
    nw: [{x:-1, y:+1}, {x:-2, y:+2}, {x:-3, y:+3}, {x:-4, y:+4}, {x:-5, y:+5}, {x:-6, y:+6}, {x:-7, y:+7},{x:-8, y:+8},{x:-9, y:+9}]
  };

  var destination, move = null;

  // Loop all moves
  for (var group in transforms) {
    for (var i=0; i<transforms[group].length; i++) {

      // Get destination square for move
      destination = transformSquare(square, transforms[group][i]);
      if (!destination) { break; }

      // If destination square is empty
      if (board[destination] === null) {
        move = {
          type        : 'move',
          pieceCode   : piece.substring(0,2),
          startSquare : square,
          endSquare   : destination
        };
       moves.push(move);
      }
      // If destination square is occupied by foe
      else if (board[destination][0] !== piece[0]) {
        move = {
          type          : 'capture',
          pieceCode     : piece.substring(0,2),
          startSquare   : square,
          endSquare     : destination,
          captureSquare : destination
        };
        // if (includeUnsafe || isMoveSafe(move, board)) {
          moves.push(move); //}
        break;
      }
      // If destination square is occupied by friend
      else {
        break;
      }
    }
  }

  return moves;
    }
};

var Queen = function(piece, square, board, lastMove, includeUnsafe){
    this.getMoves = function(piece, square, board){
        var moves = [];

    var transforms = {
        n: [{x:0, y:+1}, {x:0, y:+2}, {x:0, y:+3}, {x:0, y:+4}, {x:0, y:+5}, {x:0, y:+6}, {x:0, y:+7},
            {x:0, y:+8}, {x:0, y:+8}, {x:0, y:+9}],

        e: [{x:+1, y:0}, {x:+2, y:0}, {x:+3, y:0}, {x:+4, y:0}, {x:+5, y:0}, {x:+6, y:0}, {x:+7, y:0},
            {x:+8, y:0}, {x:+9, y:0}, {x:+10, y:0}, {x:+11, y:0}, {x:+12, y:0}, {x:+13, y:0}, {x:+14, y:0},
            {x:+15, y:0}, {x:+16, y:0}, {x:+17, y:0}, {x:+18, y:0}, {x:+19, y:0}, {x:+20, y:0}, {x:+21, y:0},
            {x:+22, y:0}, {x:+23, y:0}, {x:+24, y:0}, {x:+25, y:0}],


        s: [{x:0, y:-1}, {x:0, y:-2}, {x:0, y:-3}, {x:0, y:-4}, {x:0, y:-5}, {x:0, y:-6}, {x:0, y:-7} ,{x:0, y:-8}, {x:0, y:-9}],
        w: [{x:-1, y:0}, {x:-2, y:0}, {x:-3, y:0}, {x:-4, y:0}, {x:-5, y:0}, {x:-6, y:0}, {x:-7, y:0},
            {x:-8, y:0}, {x:-9, y:0}, {x:-10, y:0}, {x:-11, y:0}, {x:-12, y:0}, {x:-13, y:0}, {x:-14, y:0},
            {x:-15, y:0}, {x:-16, y:0}, {x:-17, y:0}, {x:-18, y:0}, {x:-19, y:0}, {x:-20, y:0}, {x:-21, y:0},
            {x:-22, y:0}, {x:-23, y:0}, {x:-24, y:0}, {x:-25, y:0}],
        ne: [{x:+1, y:+1}, {x:+2, y:+2}, {x:+3, y:+3}, {x:+4, y:+4}, {x:+5, y:+5}, {x:+6, y:+6}, {x:+7, y:+7},{x:+8, y:+8},{x:+9, y:+9}],
        se: [{x:+1, y:-1}, {x:+2, y:-2}, {x:+3, y:-3}, {x:+4, y:-4}, {x:+5, y:-5}, {x:+6, y:-6}, {x:+7, y:-7},{x:+8, y:-8},{x:+9, y:-9}],
        sw: [{x:-1, y:-1}, {x:-2, y:-2}, {x:-3, y:-3}, {x:-4, y:-4}, {x:-5, y:-5}, {x:-6, y:-6}, {x:-7, y:-7},{x:-8, y:-8},{x:-9, y:-9}],
        nw: [{x:-1, y:+1}, {x:-2, y:+2}, {x:-3, y:+3}, {x:-4, y:+4}, {x:-5, y:+5}, {x:-6, y:+6}, {x:-7, y:+7},{x:-8, y:+8},{x:-9, y:+9}]
    };


    var destination, move = null;

  // Loop all moves
  for (var group in transforms) {
    for (var i=0; i<transforms[group].length; i++) {

      // Get destination square for move
      destination = transformSquare(square, transforms[group][i]);
      if (!destination) { break; }

      // If destination square is empty
      if (board[destination] === null) {
        move = {
          type        : 'move',
          pieceCode   : piece.substring(0,2),
          startSquare : square,
          endSquare   : destination
        };
        moves.push(move);
      }
      // If destination square is occupied by foe
      else if (board[destination][0] !== piece[0]) {
        move = {
          type          : 'capture',
          pieceCode     : piece.substring(0,2),
          startSquare   : square,
          endSquare     : destination,
          captureSquare : destination
        };
        moves.push(move);
        break;
      }
      // If destination square is occupied by friend
      else {
        break;
      }
    }
  }

  return moves;
    }
};

var King = function(piece, square, board, includeUnsafe){
    this.getMoves = function(piece, square, board){
        var moves = [];

  var transforms = [
    {x:+0, y:+1},
    {x:+1, y:+1},
    {x:+1, y:+0},
    {x:+1, y:-1},
    {x:+0, y:-1},
    {x:-1, y:-1},
    {x:-1, y:+0},
    {x:-1, y:+1}
  ];

  var destination, move = null;

  // Loop all moves
  for (var i=0; i<transforms.length; i++) {

    // Get destination square for move
      if(square!==null)
    destination = transformSquare(square, transforms[i]);
    if (!destination) { continue; }

    // If destination square is empty
    if (board[destination] === null) {
      move = {
        type        : 'move',
        pieceCode   : piece.substring(0,2),
        startSquare : square,
        endSquare   : destination
      };
     moves.push(move);
    }
    // If destination square is occupied by foe
    else if (board[destination][0] !== piece[0]) {
      move = {
        type          : 'capture',
        pieceCode     : piece.substring(0,2),
        startSquare   : square,
        endSquare     : destination,
        captureSquare : destination
      };
     moves.push(move);
    }
    // If destination square is occupied by friend
    else {
      // Do nothing
    }
  }

  // Check for castling moves

  if (piece[0] === 'w') {
    if (board.e1 === 'wK_' && board.h1 === 'wR_' && board.f1 === null && board.g1 === null) {
      move = {
        type: 'castle',
        pieceCode: 'wK',
        boardSide: 'king'
      };
      moves.push(move);
    }
    if (board.e1 === 'wK_' && board.a1 === 'wR_' && board.b1 === null && board.c1 === null && board.d1 === null) {
      move = {
        type: 'castle',
        pieceCode: 'wK',
        boardSide: 'queen'
      };
      moves.push(move);
    }
  }

  if (piece[0] === 'b') {
    if (board.e8 === 'bK_' && board.h8 === 'bR_' && board.f8 === null && board.g8 === null) {
      move = {
        type: 'castle',
        pieceCode: 'bK',
        boardSide: 'king'
      };
     moves.push(move);
    }
    if (board.e8 === 'bK_' && board.a8 === 'bR_' && board.b8 === null && board.c8 === null && board.d8 === null) {
      move = {
        type: 'castle',
        pieceCode: 'bK',
        boardSide: 'queen'
      };
    moves.push(move);
    }
  }

  return moves;
    }
};

function run(){
    var moves = [];
    var piece, square = null;
    var pawn = new Pawn();
    var rook = new Rook();
    var knight = new Knight();
    var bishop = new Bishop();
    var queen = new Queen();
    var king = new King();

    var objGetMoves = new GetMovesForPlayer();

  console.log("inside move generation");
  // Loop board
  for (square in board) {
      piece = board[square];

      // Skip empty squares and opponent's pieces
      if (piece === null) {
          continue;
      }
/*      if (piece[0] !== 's') {
          // don't eveluate moves dor static players
          continue;
      }
 */
      if (square !== null) {
          // Collect all moves for all of player's pieces
          switch (piece[1]) {
              case 'P':
                  if(square!==null){
                      objGetMoves.setStrategy(pawn);
                      moves.push.apply(moves, objGetMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'R':
                  if(square!==null){
                      objGetMoves.setStrategy(rook);
                      moves.push.apply(moves, objGetMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'N':
                  if(square!==null){
                      objGetMoves.setStrategy(knight);
                      moves.push.apply(moves, objGetMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'B':
                  if(square!==null){
                      objGetMoves.setStrategy(bishop);
                      moves.push.apply(moves, objGetMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'Q':
                  if(square!==null){
                      objGetMoves.setStrategy(queen);
                      moves.push.apply(moves, objGetMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'K':
                  if(square!==null){
                      objGetMoves.setStrategy(king);
                      moves.push.apply(moves, objGetMoves.getMoves(piece, square, board));
                  }
                  break;
          }
      }
  }

  return moves;
    


}
