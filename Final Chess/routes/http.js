var DB = null;

/**
 * Validate session data for "Game" page
 * Returns valid data on success or null on failure
 */
var validateGame = function(req) {

  // These must exist
  if (!req.session.gameID)      { return null; }
  if (!req.session.playerColor) { return null; }
  if (!req.session.playerName)  { return null; }
  if (!req.params.id)           { return null; }

  // These must match
  if (req.session.gameID !== req.params.id) { return null; }

  return {
    gameID      : req.session.gameID,
    playerColor : req.session.playerColor,
    playerName  : req.session.playerName
  };
};

/**
 * Validate "Start Game" form input
 * Returns valid data on success or null on failure
 */
var validateStartGame = function(req) {

  // These must exist
  //if (!req.body['player-color']) { return 'white'; }

  // Player Color must be 'white' or 'black'
  //if (req.body['player-color'] !== 'white' && req.body['player-color'] !== 'black' && req.body['player-color'] !== 'yellow'&& req.body['player-color'] !== 'red') { return null; }

  // If Player Name consists only of whitespace, set as 'Player 1'
  if (/^\s*$/.test(req.body['player-name'])) { req.body['player-name'] = 'Player 1'; }

  return {
    playerColor : 'white',
    playerName  : req.body['player-name']
  };
};

/**
 * Validate "Join Game" form input
 * Returns valid data on success or null on failure
 */
var validateJoinGame = function(req) {

  // If Player Name consists only of whitespace, set as 'Player 2'
  if (/^\s*$/.test(req.body['player-name'])) { req.body['player-name'] = 'Player 2'; }

  return {
    playerName  : req.body['player-name']
  };
};

/**
 * Render "Home" Page
 */
var home = function(req, res) {

  // Welcome
  res.render('home');
};

/**
 * Render "Game" Page (or redirect to home page if session is invalid)
 */
var game = function(req, res) {

  // Validate session data
  var validData = validateGame(req);
  if (!validData) { res.redirect('/'); return; }

  // Render the game page
  res.render('game', validData);
};

/**
 * Process "Start Game" form submission
 * Redirects to game page on success or home page on failure
 */
var startGame = function(req, res) {

  // Create a new session
  req.session.regenerate(function(err) {
    if (err) { res.redirect('/'); return; }

    // Validate form input
    var validData = validateStartGame(req);
    if (!validData) { res.redirect('/'); return; }

    // Create new game
    var gameID = DB.add(validData);

    // Save data to session
    req.session.gameID      = gameID;
    req.session.playerColor = validData.playerColor;
    req.session.playerName  = validData.playerName;

    // Redirect to game page
    res.redirect('/game/'+gameID);
  });
};

/**
 * Process "Join Game" form submission
 * Redirects to game page on success or home page on failure
 */
var joinExistingGame = function(req, res,gameKey) {
    //creating new session.
    req.session.regenerate(function(err) {
        if (err) { res.redirect('/'); return; }

        // Validate form input
        var validData = validateJoinGame(req);
        if (!validData) { res.redirect('/'); return; }

        //
        var game = DB.find(gameKey);

        // Determine which player (color) to join as
        var joinColor ;
        if(game.players[0].joined)
            joinColor= game.players[1].color;
        if(game.players[1].joined)
            joinColor= game.players[2].color;
        if(game.players[2].joined)
            joinColor= game.players[3].color;
        if(!game.players[0].joined)
            joinColor= game.players[0].color;
        // Save data to session
        req.session.gameID      = gameKey;
        req.session.playerColor = joinColor;
        req.session.playerName  = validData.playerName;

        // Redirect to game page
        res.redirect('/game/'+gameKey);
    });
};

//proxy for redirecting requests
var joinGameProxy = function(req,res){
    var gamekey= null;

    for(key in DB.games){
        var gameid = DB.games[key];
        var playerCount = countItemsTrue(gameid.players);
        if(gameid.status === 'pending' && playerCount < 4){
            gamekey = key;
            break;
        }
    }
    if(!gamekey){
        startGame(req,res);
    }
    else{
        joinExistingGame(req,res,gamekey);
    }
}


//counting items in game with true values
function countItemsTrue(arry){
    var result = 0;
    for(x in arry){
        if(arry[x].joined == true){
            result++;
        }
    }
    return result;

}
/**
 * Redirect non-existent routes to the home page
 */
var invalid = function(req, res) {

  // Go home HTTP request, you're drunk
  res.redirect('/');
};

/**
 * Attach route handlers to the app
 */
exports.attach = function(app, db) {
  DB = db;

  app.get('/',         home);
  app.get('/game/:id', game);
  //app.post('/start',   startGame);
  app.post('/join',    joinGameProxy);
  app.all('*',         invalid);
};
