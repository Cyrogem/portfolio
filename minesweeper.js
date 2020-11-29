BOMB = -1;
BLANK = 0;
SEEN = 1;
FLAGGED = 2;

var board = [];
var rows, cols, bombs;
var firstClick = false;

function Clicked(x, y, input){
    //alert(x + " " + y);
    // Is this the start of the game
    if(firstClick){
        //Generate board
        GenerateBoard(x,y);
        firstClick = false;
    }

    tile = board[x][y];
    if(tile.Visibility == 0){
        // Blank tile clicked
        if(tile.Value == BOMB){
            GameOver();
            return;
        } else {
            tile.Value = AdjacentBombs(x,y);
            tile.Object.src = String(tile.Value + ".png");
        }
    }
}

function AdjacentBombs(x,y){
    adjBombs = 0;
    for(var i = Math.max(x-1,0); i <= Math.min(x + 1,cols - 1); i++){
        for(var j = Math.max(y-1,0); j <= Math.min(y + 1,rows - 1); j++){
            if(board[i][j].Value == BOMB){
                adjBombs++;
            } else {
                // This tile is adjacent to a known tile, we must keep this open
                board[i][j].Value = 9;
            }
        }
    }
    return adjBombs;
}

function GameOver(){

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
        board[x][y].Object.src = "Flag.png";
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
    boardContainer.style.gridTemplateColumns = "repeat(" + cols + ",25px)";
    boardContainer.style.gridTemplateRows = "repeat(" + rows + ",25px)";

    for(let y = 0; y < rows; y++){
        gameHTML += "<tr>";
        for(let x = 0; x < cols; x++){
            gameHTML += 
                "<div grid-row='" + x + "/" + (rows - 1) + "' grid-column='" + y + "/" + (cols - 1) + "'>"
                + "<input type='" + "image" + "' id='" + x + "," + y + "' src='" + 
                "_.png" + "' class='" + "minesweeper-tile" + "'></div>";
        }
    }
    
    boardContainer.innerHTML = gameHTML;
    // The game is now laid out, time to grab references to it all
    board = new Array(cols);
    for(let x = 0; x < cols; x++){
        gameCol = new Array(rows);
        for(let y = 0; y < rows; y++){
            gameCol[y] = {"Object": document.getElementById(x + "," + y), "Value": 0, "Visibility": BLANK};
            gameCol[y].Object.onclick = function(){ Clicked(x,y,1)};
            gameCol[y].Object.oncontextmenu = function(){ Clicked(x,y,2); return false; };
        }
        board[x] = gameCol;
        //console.log(board[x][3].Object.onclick)
    }
    firstClick = true;
    //board[4][2].Object.src = "8.png";
    //alert(board[4][2].Object);
}

CreateGame(2);



/*
function round(num, places){
    return Math.round(num * Math.pow(10,places))/Math.pow(10,places);
}

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