//alert(document.getElementByID("minesweeper-tile"));

var board = [];
function CreateGame(difficulty){
    var boardContainer = document.getElementById("minesweeper-board");
    var gameHTML = "<table>";
    var rows, cols, bombs;
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

    for(var y = 0; y < rows; y++){
        gameHTML += "<tr>";
        for(var x = 0; x < rows; x++){
            gameHTML += 
                "<td><input type='" + "image" + "' id='" + x + "," + y + "' src='" + 
                "1.png" + "' class='" + "minesweeper-tile" + "'></td>";
        }
    }
    gameHTML += "</table>";
    boardContainer.innerHTML = gameHTML;
    // The game is now laid out, time to grab references to it all
    board = new Array(cols);
    for(var x = 0; x < cols; x++){
        gameCol = new Array(rows);
        for(var y = 0; y < rows; y++){
            gameCol[y] = {"Object": document.getElementById(x + "," + y), "Value": 0, "Visibility": 0};
        }
        board[x] = gameCol;
    }
    board[1][1].Object.src = "8.png"
    alert(board[4][2].Object);
}

CreateGame(0);



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