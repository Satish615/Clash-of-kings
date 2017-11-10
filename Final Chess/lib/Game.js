function Game(params) {

  // pending/ongoing/checkmate/stalemate/forfeit
  this.status = 'pending';

  this.activePlayer = null; //Not needed now

/*
  this.active = null;
  var outerScope = this;
  var activetimer =  setInterval(function(){
      if(outerScope.active){
          outerScope.active = false;
      }
      else outerScope.active = true;
      console.log("set timer -" + outerScope.active);
  }, 10000);
   */
  this.players = [
    {color: 'white', name: null, joined: false, inCheck: false, forfeited: false},
    {color: 'black', name: null, joined: false, inCheck: false, forfeited: false},
    {color: 'red', name: null, joined: false, inCheck: false, forfeited: false},
    {color: 'yellow', name: null, joined: false, inCheck: false, forfeited: false}
  ];

    this.board = {

        a9: null, b9: null, c9: null, d9: null, e9: null, f9: null, g9: null, h9: null,
        i9: null, j9: null, k9: null, l9: null, m9: null, n9: null, o9: null, p9: null,
        q9: null, r9: null, s9:null, t9: null, u9: null, v9: null, w9: null, x9: null,
        y9: null, z9: null,
        a8: null, b8: null, c8: null, d8: null, e8: null, f8:null, g8: null, h8: null,
        i8: null, j8: null, k8: null, l8: null, m8: null, n8: null, o8: null, p8: null,
        q8: null, r8: null, s8: null, t8: null, u8: null, v8: null, w8: null, x8: null,
        y8: null, z8: null,
        a7: null, b7: null, c7: null, d7: null, e7: null, f7: null, g7: null, h7: null,
        i7: null, j7: null, k7: null, l7: null, m7: null, n7: null, o7: null, p7: null,
        q7: null, r7: null, s7: null, t7: null, u7: null, v7: null, w7: null,x7: null,
        y7: null, z7: null,
        a6: null,  b6: null,  c6: null,  d6: null,  e6: null,  f6: null,  g6: null,  h6: null,
        i6: null, j6: null, k6: null, l6: null, m6: null, n6: null, o6: null, p6: null,
        q6: null, r6: null, s6: null, t6: null, u6: null, v6: null, w6: null, x6: null,
        y6: null, z6: null,
        a5: null,  b5: null,  c5: null,  d5: null,  e5: null,  f5: null,  g5: null,  h5: null,
        i5: null, j5:null, k5: null, l5: null, m5: null, n5: null, o5: null, p5: null,
        q5: null, r5: null, s5: null, t5: null, u5:null, v5: null, w5: null, x5: null,
        y5: null, z5: null,
        a4: null,  b4: null,  c4: null,  d4: null,  e4: null,  f4: null,  g4: null,  h4: null,
        i4: null, j4: null, k4: null, l4: null, m4: null, n4: null, o4: null, p4: null,
        q4: null, r4: null, s4: null, t4: null, u4: null, v4: null, w4: null, x4: null,
        y4: null, z4: null,
        a3: null,  b3: null,  c3: null,  d3: null,  e3: null,  f3: null,  g3: null,  h3: null,
        i3: null, j3: null, k3: null, l3: null, m3: null, n3: null, o3: null, p3: null,
        q3: null, r3: null, s3: null, t3: null, u3: null, v3: null, w3: null, x3: null,
        y3: null, z3: null,
        a2: null, b2: null, c2: null, d2: null, e2: null, f2: null, g2: null, h2: null,
        i2: null, j2: null, k2: null, l2: null, m2: null, n2: null, o2: null, p2: null,
        q2: null, r2: null, s2: null, t2: null, u2: null, v2: null, w2: null, x2: null,
        y2: null, z2: null,
        a1: null, b1: null, c1: null, d1: null, e1: null, f1: null, g1: null, h1:null,
        i1: null, j1: null, k1: null, l1: null, m1: null, n1: null, o1:null, p1: null,
        q1: null, r1: null, s1: null, t1: null, u1: null, v1: null, w1:null, x1:null,
        y1: null, z1: null,
        a0: null, b0: null, c0:null, d0: null, e0: null, f0:null, g0: null, h0: null,
        i0: null, j0: null, k0:null, l0: null, m0: null, n0: null, o0: null, p0: null,
        q0: null, r0: null, s0: null, t0: null, u0: null, v0: null, w0: null, x0: null,
        y0: null, z0: null  };

  this.capturedPieces = [];

  this.validMoves = [
    { type: 'move', pieceCode: 'wK', startSquare: 'a0', endSquare: 'a1' },
    { type: 'move', pieceCode: 'wK ', startSquare: 'a0', endSquare: 'b0' },
    { type: 'move', pieceCode: 'wK', startSquare: 'a0', endSquare: 'b1' },
    { type: 'move', pieceCode: 'rK', startSquare: 'z0', endSquare: 'z1' },
    { type: 'move', pieceCode: 'rK', startSquare: 'z0', endSquare: 'y1' },
    { type: 'move', pieceCode: 'rK', startSquare: 'z0', endSquare: 'y0' },
    { type: 'move', pieceCode: 'yK', startSquare: 'a9', endSquare: 'b8' },
    { type: 'move', pieceCode: 'yK', startSquare: 'a9', endSquare: 'b9' },
    { type: 'move', pieceCode: 'yK', startSquare: 'a9', endSquare: 'a8' },
    { type: 'move', pieceCode: 'bK', startSquare: 'z9', endSquare: 'y8' },
    { type: 'move', pieceCode: 'bK', startSquare: 'z9', endSquare: 'y9' },
    { type: 'move', pieceCode: 'bK', startSquare: 'z9', endSquare: 'z8' }
  ];

  this.lastMove = null;

  this.modifiedOn = Date.now();

  // Set player colors
  // params.playerColor is the color of the player who created the game
  if (params.playerColor === 'white') {
    this.players[0].color = 'white';
    this.players[1].color = 'black';
      this.players[2].color = 'red';
      this.players[3].color = 'yellow';
  }
  else if (params.playerColor === 'black') {
      this.players[0].color = 'white';
      this.players[1].color = 'black';
      this.players[2].color = 'red';
      this.players[3].color = 'yellow';
  }
}

/**
 * Add player to game, and after both players have joined activate the game.
 * Returns true on success and false on failure.
 */
Game.prototype.addPlayer = function(playerData) {
    var p;
    p = _.findWhere(this.players, { joined: false});

    if (!p) { return false; }


    // Set player info
    p.name = playerData.playerName;
    p.joined = true;
    //console.log(p);

    if(this.players[0].joined){
        this.board['a0'] = 'wK';
    }

    if(this.players[1].joined){
        this.board['z9'] = 'bK';
    }

    if(this.players[2].joined){
        this.board['z0'] = 'rK';
    }

    if(this.players[3].joined){
        this.board['a9'] = 'yK';
    }

    // If both players have joined, start the game
    if (this.players[0].joined && this.players[1].joined
        //&& this.players[2].joined && this.players[3].joined && this.status == 'pending'
    ) {
       // this.activePlayer = _.findWhere(this.players, {color: 'white'});
        this.status = 'ongoing';
    }

    this.modifiedOn = Date.now();

    return true;
};

Game.prototype.removePlayer = function(playerData) {

  // Find player in question
  var p = _.findWhere(this.players, {color: playerData.playerColor});
  if (!p) { return false; }

  // Set player info
  p.joined = false;

  this.modifiedOn = Date.now();

  return true;
};

Game.prototype.forfeit = function(playerData) {

  // Find player in question
  var p = _.findWhere(this.players, {color: playerData.playerColor});
  if (!p) { return false; }

  // Set player info
  p.forfeited = true;

  // Set game status
  this.status = 'forfeit';

  this.modifiedOn = Date.now();

  return true;
};


  var PlayerMoves = function(){
    this.chessPiece = "";
}
  
//using Strategy Pattern for defining player moves
PlayerMoves.prototype = {
    setStrategy: function(chessPiece){
        this.chessPiece = chessPiece;
    },

    getMoves: function(piece, square, board){
        return this.piece.getMoves(piece, square, board);
    }
};

//defining moves for Pawn
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

function getMovesForPlayer(){
    var moves = [];
    var piece, square = null;
    var pawn = new Pawn();
    var rook = new Rook();
    var knight = new Knight();
    var bishop = new Bishop();
    var queen = new Queen();
    var king = new King();

    var playerMoves = new PlayerMoves();

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
                      playerMoves.setStrategy(pawn);
                      moves.push.apply(moves, playerMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'R':
                  if(square!==null){
                      playerMoves.setStrategy(rook);
                      moves.push.apply(moves, playerMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'N':
                  if(square!==null){
                      playerMoves.setStrategy(knight);
                      moves.push.apply(moves, playerMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'B':
                  if(square!==null){
                      playerMoves.setStrategy(bishop);
                      moves.push.apply(moves, playerMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'Q':
                  if(square!==null){
                      playerMoves.setStrategy(queen);
                      moves.push.apply(moves, playerMoves.getMoves(piece, square, board));
                  }
                  break;
              case 'K':
                  if(square!==null){
                      playerMoves.setStrategy(king);
                      moves.push.apply(moves, playerMoves.getMoves(piece, square, board));
                  }
                  break;
          }
      }
  }

  return moves;
    
};

var transformSquare = function(square, transform) {
    if(square!==null) {
        var alpha2num = function (a) {
            switch (a) {
                case 'a':
                    return 1;
                case 'b':
                    return 2;
                case 'c':
                    return 3;
                case 'd':
                    return 4;
                case 'e':
                    return 5;
                case 'f':
                    return 6;
                case 'g':
                    return 7;
                case 'h':
                    return 8;
                case 'i':
                    return 9;
                case 'j':
                    return 10;
                case 'k':
                    return 11;
                case 'l':
                    return 12;
                case 'm':
                    return 13;
                case 'n':
                    return 14;
                case 'o':
                    return 15;
                case 'p':
                    return 16;
                case 'q':
                    return 17;
                case 'r':
                    return 18;
                case 's':
                    return 19;
                case 't':
                    return 20;
                case 'u':
                    return 21;
                case 'v':
                    return 22;
                case 'w':
                    return 23;
                case 'x':
                    return 24;
                case 'y':
                    return 25;
                case 'z':
                    return 26;
                default :
                    return 26; // out of bounds
            }
        };

        var num2alpha = function (n) {
            switch (n) {
                case 1:
                    return 'a';
                case 2:
                    return 'b';
                case 3:
                    return 'c';
                case 4:
                    return 'd';
                case 5:
                    return 'e';
                case 6:
                    return 'f';
                case 7:
                    return 'g';
                case 8:
                    return 'h';
                case 9:
                    return 'i';
                case 10:
                    return 'j';
                case 11:
                    return 'k';
                case 12:
                    return 'l';
                case 13:
                    return 'm';
                case 14:
                    return 'n';
                case 15:
                    return 'o';
                case 16:
                    return 'p';
                case 17:
                    return 'q';
                case 18:
                    return 'r';
                case 19:
                    return 's';
                case 20:
                    return 't';
                case 21:
                    return 'u';
                case 22:
                    return 'v';
                case 23:
                    return 'w';
                case 24:
                    return 'x';
                case 25:
                    return 'y';
                case 26:
                    return 'z';
                default:
                    return 'i'; // out of bounds
            }
        };

        // Parse square
        var file = square[0];
        var rank = parseInt(square[1], 10);

        // Apply transform
        var destFile = alpha2num(file) + transform.x;
        var destRank = rank + transform.y;

        // Check boundaries
        if (destFile < 1 || destFile > 26) {
            return false;
        }
        if (destRank < 0 || destRank > 9) {
            return false;
        }

        // Return new square
        return num2alpha(destFile) + destRank;
    }
    else
        return null;
};

// Export the game object
module.exports = Game;


