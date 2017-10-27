function Game(params) {

  this.status = 'pending';

  this.activePlayer = null;

  this.players = [
    {color: 'white', name: null, joined: false, inCheck: false, forfeited: false},
    {color: 'black', name: null, joined: false, inCheck: false, forfeited: false},
      {color: 'red', name: null, joined: false, inCheck: false, forfeited: false},
      {color: 'yellow', name: null, joined: false, inCheck: false, forfeited: false}
  ];

    this.board = {

        a9: 'bR_', b9: 'bN_', c9: 'bB_', d9: 'bQ_', e9: 'bK_', f9: 'bB_', g9: 'bN_', h9: 'bR_',
        i9: null, j9: null, k9: null, l9: null, m9: null, n9: null, o9: null, p9: null,
        q9: null, r9: null, s9:null, t9: null, u9: null, v9: null, w9: null, x9: null,
        y9: null, z9: null,
        a8: 'bP_', b8: 'bP_', c8: 'bP_', d8: 'bP_', e8: 'bP_', f8: 'bP_', g8: 'bP_', h8: 'bP_',
        i8: null, j8: null, k8: null, l8: null, m8: null, n8: null, o8: null, p8: null,
        q8: null, r8: null, s8: null, t8: null, u8: null, v8: null, w8: null, x8: null,
        y8: null, z8: null,
        a7: null, b7: null, c7: null, d7: null, e7: null, f7: null, g7: null, h7: null,
        i7: null, j7: null, k7: null, l7: null, m7: null, n7: null, o7: null, p7: null,
        q7: null, r7: null, s7: null, t7: null, u7: 'yR', v7: 'yQ', w7: 'yK',x7: 'yN',
        y7: 'yB', z7: 'yP',
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
        i2: null, j2: null, k2: null, l2: null, m2: null, n2: null, o2: 'rQ', p2: 'rB',
        q2: 'rN', r2: 'rR', s2: 'rK', t2: 'rP', u2: null, v2: null, w2: null, x2: null,
        y2: null, z2: null,
        a1: 'wP', b1: 'wP', c1: 'wP_', d1: 'wP_', e1: 'wP_', f1: 'wP_', g1: 'wP_', h1: 'wP_',
        i1: null, j1: null, k1: null, l1: null, m1: null, n1: null, o1:null, p1: null,
        q1: null, r1: null, s1: null, t1: null, u1: null, v1: null, w1:null, x1:null,
        y1: null, z1: null,
        a0: 'wR_', b0: 'wN_', c0: 'wB_', d0: 'wQ_', e0: 'wK_', f0: 'wB_', g0: 'wN_', h0: 'wR_',
        i0: null, j0: null, k0:null, l0: null, m0: null, n0: null, o0: null, p0: null,
        q0: null, r0: null, s0: null, t0: null, u0: null, v0: null, w0: null, x0: null,
        y0: null, z0: null  };

  this.capturedPieces = [];

  this.validMoves = [
    { type: 'move', pieceCode: 'wP', startSquare: 'a1', endSquare: 'a3' },
    { type: 'move', pieceCode: 'wP ', startSquare: 'b1', endSquare: 'b3' },
    { type: 'move', pieceCode: 'wP_', startSquare: 'c1', endSquare: 'b3' },
    { type: 'move', pieceCode: 'wP_', startSquare: 'b2', endSquare: 'b4' },
    { type: 'move', pieceCode: 'wP', startSquare: 'c2', endSquare: 'c3' },
    { type: 'move', pieceCode: 'wP', startSquare: 'c2', endSquare: 'c4' },
    { type: 'move', pieceCode: 'wP', startSquare: 'd2', endSquare: 'd3' },
    { type: 'move', pieceCode: 'wP', startSquare: 'd2', endSquare: 'd4' },
    { type: 'move', pieceCode: 'wP', startSquare: 'e2', endSquare: 'e3' },
    { type: 'move', pieceCode: 'wP', startSquare: 'e2', endSquare: 'e4' },
    { type: 'move', pieceCode: 'wP', startSquare: 'f2', endSquare: 'f3' },
    { type: 'move', pieceCode: 'wP', startSquare: 'f2', endSquare: 'f4' },
    { type: 'move', pieceCode: 'wP', startSquare: 'g2', endSquare: 'g3' },
    { type: 'move', pieceCode: 'wP', startSquare: 'g2', endSquare: 'g4' },
    { type: 'move', pieceCode: 'wP', startSquare: 'h2', endSquare: 'h3' },
    { type: 'move', pieceCode: 'wP', startSquare: 'h2', endSquare: 'h4' },
    { type: 'move', pieceCode: 'wN', startSquare: 'b1', endSquare: 'a3' },
    { type: 'move', pieceCode: 'wN', startSquare: 'b1', endSquare: 'c3' },
    { type: 'move', pieceCode: 'wN', startSquare: 'g1', endSquare: 'f3' },
    { type: 'move', pieceCode: 'wN', startSquare: 'g1', endSquare: 'h3' }
  ];
}
// Export the game object
module.exports = Game;