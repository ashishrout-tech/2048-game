
var board;
var score = 0;
var rows = 4;
var columns = 4;

window.onload = function () {
    setGame();
}

setInterval(() => {
    gameOver();
}, 100);

function setGame() {
    board = [
        [2, 0, 0, 0],
        [0, 2, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ]

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            // <div id="0-0"></div>
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();

            let num = board[r][c];
            updateTile(tile, num);
            document.getElementById("board").appendChild(tile);
        }
    }
}

function updateTile(tile, num) {
    tile.innerText = "";
    tile.classList.value = "";
    tile.classList.add("tile");
    if (num > 0) {
        tile.innerText = num;
        if (num <= 4096) {
            tile.classList.add(`x${num}`)
        }
        else {
            tile.classList.add(`x8192`)
        }
    }
}

document.addEventListener("keyup", (e) => {
    if (e.code == "ArrowLeft") {
        slideLeft();
    }
    else if (e.code == "ArrowRight") {
        slideRight();
    }
    else if (e.code == "ArrowUp") {
        slideUp();
    }
    else if (e.code == "ArrowDown") {
        slideDown();
    }
})

function slide(row) {
    row = row.filter((num) => num > 0);

    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] == row[i + 1]) {
            row[i] *= 2;
            row[i + 1] = 0;
            score += row[i];
            document.getElementById("score").innerText = score;
        }
    }

    row = row.filter((num) => num > 0);

    while (row.length < columns) {
        row.push(0);
    }

    return row;
}

function slideLeft() {
    let oldBoard = [...board];
    let flag = false, i = 0;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row = slide(row);
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
            if(oldBoard[r][c] != board[r][c]){
                flag = true;
                i = r;
            }
        }
    }
    if(flag){
        board[i][3] = 2;
        let tile = document.getElementById(i.toString() + "-3");
        updateTile(tile, board[i][3]);
    }
}

function slideRight() {
    let oldBoard = [...board];
    let flag = false, i = 0;
    for (let r = 0; r < rows; r++) {
        let row = board[r];
        row.reverse();
        row = slide(row);
        row.reverse();
        board[r] = row;

        for (let c = 0; c < columns; c++) {
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
            if(oldBoard[r][c] != board[r][c]){
                flag = true;
                i = r;
            }
        }
    }
    if(flag){
        board[i][0] = 2;
        let tile = document.getElementById(i.toString() + "-0");
        updateTile(tile, board[i][0]);
    }
}

function slideUp(){
    let oldBoard = [];
    for(let r = 0; r < rows; r++){
        let oldRow= [];
        for(let c = 0; c < columns; c++){
            oldRow.push(board[r][c]);
        }
        oldBoard.push(oldRow);
    }
    let flag = false, i = 0;
    for(let c = 0; c < columns; c++){
        let row = [];
        for(let r = 0; r < rows; r++){
            row.push(board[r][c]);
        }
        row = slide(row);
        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
        }
        for(let r = 0; r < rows; r++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
            if(oldBoard[r][c] != board[r][c]){
                flag = true;
                i = c;
            }
        }
    }
    if(flag){
        board[3][i] = 2;
        let tile = document.getElementById("3-" + i.toString());
        updateTile(tile, board[3][i]);
    }
}

function slideDown(){
    let oldBoard = [];
    for(let r = 0; r < rows; r++){
        let oldRow= [];
        for(let c = 0; c < columns; c++){
            oldRow.push(board[r][c]);
        }
        oldBoard.push(oldRow);
    }
    let flag = false, i = 0;
    for(let c = 0; c < columns; c++){
        let row = [];
        for(let r = 0; r < rows; r++){
            row.push(board[r][c]);
        }
        row.reverse();
        row = slide(row);
        row.reverse();
        for(let r = 0; r < rows; r++){
            board[r][c] = row[r];
        }
        for(let r = 0; r < rows; r++){
            let tile = document.getElementById(r.toString() + "-" + c.toString());
            updateTile(tile, board[r][c]);
            if(oldBoard[r][c] != board[r][c]){
                flag = true;
                i = c;
            }
        }
    }
    if(flag){
        board[0][i] = 2;
        let tile = document.getElementById("0-" + i.toString());
        updateTile(tile, board[0][i]);
    }
}

function gameOver(){
    let over = true;
    for(let r = 0; r < rows-1; r++){
        for(let c = 0; c < columns-1; c++){
            if(board[r][c]== board[r+1][c] || board[r][c]== board[r][c+1]){
                over = false;
            }
            if(board[r][c] == 0 || board[r+1][c] == 0 || board[r][c+1] == 0){
                over = false;
            }
        }
    }
    if(over) {
        alert(`GAME OVER. SCORE = ${score}`)
        score = 0;
        document.getElementById("score").innerText = score;
        board=[];
        for(let r = 0; r <rows; r++){
            for(let c = 0; c< columns; c++){
                
                let chd = document.getElementById(`${r}-${c}`);
                document.getElementById("board").removeChild(chd);
                
            }
        }
        setGame();
    }    
}