BOMB = -1;
UNKNOWN = 0;
KNOWN = 1;
FLAGGED = 2;
LEFTCLICK = 1;
RIGHTCLICK = 2;
TILESIZE = 35;

var board = [];
var rows, cols, bombs;
var firstClick = false;
var startTime, gameTime, runningTimer;
var revealedTiles, totalTiles, placedFlags;
var bestTime = 10000000;

document.getElementById("minesweeper-easy").onclick = function(){CreateGame(0)};
document.getElementById("minesweeper-medium").onclick = function(){CreateGame(1)};
document.getElementById("minesweeper-hard").onclick = function(){CreateGame(2)};

var timer = document.getElementById("minesweeper-time");
var bestTimer = document.getElementById("minesweeper-best");
var flags = document.getElementById("minesweeper-flags");

function Clicked(x, y, input){
    //alert(x + " " + y);
    // Is this the start of the game
    if(firstClick){
        //Generate board
        GenerateBoard(x,y);
        firstClick = false;
        StartTimer();
    }
    
    tile = board[x][y];
    if (input == RIGHTCLICK){
        if(tile.Visibility == UNKNOWN){
            tile.Visibility = FLAGGED;
            tile.Object.src = "minesweeper_images/flag.png"
            placedFlags++;
        } else if (tile.Visibility == FLAGGED){
            tile.Visibility = UNKNOWN;
            tile.Object.src = "minesweeper_images/_.png"
            placedFlags--;
        }
        UpdateFlagCount();
    }else{
        // Left click
        if(tile.Visibility == 0){
            // Blank tile clicked
            if(tile.Value == BOMB){
                GameOver();
                return;
            } else {
                tile.Value = AdjacentBombs(x,y);
                tile.Object.src = String("minesweeper_images/" + tile.Value + ".png");
                tile.Visibility = KNOWN;
                revealedTiles++;
                if(tile.Value == 0){
                    RevealAdjacents(x,y);
                }
            }
        } else if (tile.Visibility == KNOWN){
            // Speed adjacents
            if(tile.Value == AdjacentFlags(x,y)){
                RevealAdjacents(x,y);
            }
        }

        // Check for win
        if(totalTiles - revealedTiles == bombs){
            GameWin();
        }
    }
}

function AdjacentBombs(x,y){
    adjBombs = 0;
    for(var i = Math.max(x-1,0); i <= Math.min(x + 1,cols - 1); i++){
        for(var j = Math.max(y-1,0); j <= Math.min(y + 1,rows - 1); j++){
            if(board[i][j].Value == BOMB){
                adjBombs++;
            }
        }
    }
    return adjBombs;
}
function AdjacentFlags(x,y){
    adjFlags = 0;
    for(var i = Math.max(x-1,0); i <= Math.min(x + 1,cols - 1); i++){
        for(var j = Math.max(y-1,0); j <= Math.min(y + 1,rows - 1); j++){
            if(board[i][j].Visibility == FLAGGED){
                adjFlags++;
            }
        }
    }
    return adjFlags;
}
function RevealAdjacents(x,y){
    for(var i = Math.max(x-1,0); i <= Math.min(x + 1,cols - 1); i++){
        for(var j = Math.max(y-1,0); j <= Math.min(y + 1,rows - 1); j++){
            if(board[i][j].Visibility == UNKNOWN){
                Clicked(i,j,LEFTCLICK);
            }
        }
    }
}
function RevealAll(){
    for(var x = 0; x < cols; x++){
        for(var y = 0; y < rows; y++){
            if(board[x][y].Visibility == UNKNOWN){
                if(board[x][y].Value == BOMB){
                    board[x][y].Object.src = "minesweeper_images/bomb.png";
                } else {
                    board[x][y].Object.src = String("minesweeper_images/" + AdjacentBombs(x,y) + ".png");
                }
            }
        }
    }
}

function GameOver(){
    RevealAll();
    StopTimer();
}
function GameWin(){
    StopTimer();
    UpdateTimer();
    if(gameTime < bestTime){
        bestTime = gameTime;
        var seconds = Round(gameTime / 1000,0) % 60;
        var minutes = (Round(gameTime / 1000,0) - seconds) / 60;
        if (seconds < 10) seconds = "0" + seconds;
        bestTimer.innerHTML = "Best - " + minutes + ":" + seconds;
    }
}
function StartTimer(){
    startTime = performance.now();
    runningTimer = setInterval(UpdateTimer,1000);
}
function UpdateTimer(){
    gameTime = performance.now() - startTime;
    var seconds = Round(gameTime / 1000,0) % 60;
    var minutes = (Round(gameTime / 1000,0) - seconds) / 60;
    if (seconds < 10) seconds = "0" + seconds;
    timer.innerHTML = "Time - " + minutes + ":" + seconds;
}
function StopTimer(){
    clearInterval(runningTimer);
}
function UpdateFlagCount(){
    flags.innerHTML = "Flags - " + placedFlags + "/" + bombs;
}

function GenerateBoard(clickX,clickY){
    placedBombs = 0;
    while (placedBombs < bombs){
        x = Math.floor(Math.random() * cols);
        y = Math.floor(Math.random() * rows);

        if(board[x][y].Value == -1) continue;
        if(x >= clickX - 1 && x <= clickX + 1 &&
        y >= clickY - 1 && y <= clickY + 1){
            continue;
        }
        board[x][y].Value = BOMB;
        //board[x][y].Object.src = "flag.png";
        placedBombs++;
    }
}

function CreateGame(difficulty){
    var boardContainer = document.getElementById("minesweeper-board");
    var gameHTML = "";
    if(difficulty == 0){
        rows = cols = 8;
        bombs = 10;
    } else if (difficulty == 1){
        rows = cols = 16;
        bombs = 50;
    } else {
        //Default to hard because I said so
        rows = 16;
        cols = 30;
        bombs = 99;
    }
    boardContainer.style.gridTemplateColumns = "repeat(" + cols + "," + TILESIZE + "px)";
    boardContainer.style.gridTemplateRows = "repeat(" + rows + "," + TILESIZE + "px)";
    
    // We need to set the max width to ensure that this is centered
    boardContainer.style.maxWidth = String(37 * cols) + "px";
    
    for(let y = 0; y < rows; y++){
        //gameHTML += "<tr>";
        for(let x = 0; x < cols; x++){
            gameHTML += 
            "<div grid-row='" + x + "' grid-column='" + y + "'>"
            + "<input type='" + "image" + "' id='" + x + "," + y + "' src='" + 
            "minesweeper_images/_.png" + "' class='" + "minesweeper-tile" + "'></div>";
        }
    }
    
    boardContainer.innerHTML = gameHTML;
    // The game is now laid out, time to grab references to it all
    board = new Array(cols);
    for(let x = 0; x < cols; x++){
        gameCol = new Array(rows);
        for(let y = 0; y < rows; y++){
            gameCol[y] = {"Object": document.getElementById(x + "," + y), "Value": 0, "Visibility": UNKNOWN};
            gameCol[y].Object.onclick = function(){ Clicked(x,y,LEFTCLICK)};
            gameCol[y].Object.oncontextmenu = function(){ Clicked(x,y,RIGHTCLICK); return false; };
        }
        board[x] = gameCol;
        //console.log(board[x][3].Object.onclick)
    }
    firstClick = true;
    revealedTiles = 0;
    totalTiles = rows * cols;
    placedFlags = 0;
    UpdateFlagCount();
    timer.innerHTML = "Time - 0:00";
    StopTimer();
    
    //board[4][2].Object.src = "8.png";
    //alert(board[4][2].Object);
}

CreateGame(0);



function Round(num, places){
    return Math.round(num * Math.pow(10,places))/Math.pow(10,places);
}

/*
function Update(){
    time += msFrequency;
    if(time % 1 == 0) {
        buttonElement.textContent = time.toString();
        buttonSecret.disabled = false;
        var think = time / 1000;
        var actual = Math.round(performance.now()) / 1000
        buttonSecret.textContent = 
            "I think it's been " + think + "s\nBut it's actually been "
             + actual + "s\nI am " + round((actual - think),2) + "s behind reality";

    }
    console.log(Math.round(performance.now()) + " " + time / 1000);
}

var buttonElement = document.getElementById('my-first-button');
var buttonSecret = document.getElementById('secret-button');
var time = 0;
var msFrequency = 100;

buttonElement.addEventListener('click',function (){
    console.log("The button was pressed!");
})
buttonSecret.disabled = true;

b4.addEventListener('click',() => {
    hoverAudio.pause();
    Audio("boing_x.wav").play();
})

setInterval(Update, msFrequency);
*/