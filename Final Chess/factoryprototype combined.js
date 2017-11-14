
///Implementation of staticfactory with createPiece



StaticFactory= function () {
    var proto;
    this.createPiece = function (type) {
        var piece;

        if (type === "Rook") {
             proto = new StaticRookPrototype();
            piece = proto.clone();
        } else if (type === "Pawn") {
            proto = new StaticPawnPrototype();
            piece = proto.clone();
        } else if (type === "Bishop") {
            proto = new StaticBishopPrototype();
            piece = proto.clone();
        } else if (type === "Queen") {
            proto = new StaticQueenPrototype();
            piece = proto.clone();
        }
        else if (type === "Knight") {
            proto = new StaticKnightPrototype();
            piece = proto.clone();
        }
       // piece.type = type;



        return piece;
    };
};





//Implementing object asignee function
StaticRook=function() {
    this.idhere='sR';//returning the object

   var getId=function(){
       return 'sR';
   }
};


StaticBishop=function() {
    this.idhere='sB';
   var  getId=function(){
        return 'sB';
    }
};
StaticKnight=function() {
    this.idhere='sN';
   var  getId=function(){
        return 'sN';
    }
};
StaticPawn=function() {
    this.idhere='sP';
    var  getId=function(){
        return 'sP';
    }
};

StaticQueen=function() {
    this.idhere='sQ';
    var  getId=function(){
        return 'sQ';
    }
};



//prototype implemented


StaticRookPrototype=function() {

    this.clone = function () {
        Piece1 = new StaticRook();
        return Piece1;
    };
};

StaticBishopPrototype=function() {

    this.clone = function () {
        Piece1 = new StaticBishop();
        return Piece1;
    };
};

StaticKnightPrototype=function() {

    this.clone = function () {
        Piece1 = new StaticKnight();
        return Piece1;
    };

};

StaticQueenPrototype=function() {

    this.clone = function () {
        Piece1 = new StaticQueen();
        return Piece1;
    };

};




///call factory and push the arguement

var pieces =[];
    var staticfactory = new StaticFactory();

    pieces.push(staticfactory.createPiece("Rook"));
    console.log(pieces);
   // pieces.push(staticfactory.createPiece("Pawn"));
    //console.log(pieces);
    pieces.push(staticfactory.createPiece("Bishop"));
    console.log(pieces);
    pieces.push(staticfactory.createPiece("Queen"));
    console.log(pieces);
    pieces.push(staticfactory.createPiece("Knight"));
    console.log(pieces);
    var getpositionsforBishop=new GetpositionsforBishop();
    console.log(getpositionsforBishop.posit);
    var getpositionsforRook=new GetpositionsforRook();
    console.log(getpositionsforRook.posit);
    //var getpositionsforQueen=new GetpositionsforQueen();
    var getpositionsforPawn=new GetpositionsforPawn();
    console.log(getpositionsforPawn.posit);
    var getpositionsforKnight=new GetpositionsforKnight();
    console.log(getpositionsforKnight.posit);