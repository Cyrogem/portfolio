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