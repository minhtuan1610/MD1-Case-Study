//Create a game board
let arrBoard = [];

function creatBoardInfo() {
    for (let i = 0; i < 5; i++) {
        arrBoard[i] = [];
        for (let j = 0; j < 5; j++) {
            arrBoard[i][j] = "<div onclick='clickAction(" + i + ',' + j + ")' id='s" + i + j + "'>&nbsp;</div>";
        }
    }
}

function drawBoard() {
    let board = "<table>";
    for (let i = 0; i < 5; i++) {
        board += "<tr>";
        for (let j = 0; j < 5; j++) {
            board += "<td>";
            board += arrBoard[i][j];
            board += "</td>";
        }
        board += "<td>";
        board += "<div id='h" + i + 5 + "'>" + "</div>";
        board += "</td>";
        board += "</tr>";
    }
    board += "<tr>";
    for (let i = 0; i < 5; i++) {
        board += "<td>";
        board += "<div id='h" + 5 + i + "'>" + "</div>";
        board += "</td>";
    }
    board += "</tr>";
    board += "</table>";
    document.getElementById("gameBoard").innerHTML = board;
    hintBoard();
}

//Create the sum of cells and the sum of booms
let cell = [];
let countCell23 = 0;

//Set the sum of cells in rows or columns
function getSumCellRow(x) {
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
        cnt += cell[x][i];
    }
    return cnt;
}

function getSumCellCol(x) {
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
        cnt += cell[i][x];
    }
    return cnt;
}

//Set the sum of booms in rows and columns
function getBoomRow(i) {
    let countBoom = 0;
    for (let j = 0; j < 5; j++) {
        if (cell[i][j] == 0) {
            countBoom++;
        }
    }
    return countBoom;
}

function getBoomCol(j) {
    let countBoom = 0;
    for (let i = 0; i < 5; i++) {
        if (cell[i][j] == 0) {
            countBoom++;
        }
    }
    return countBoom;
}

//

//Show the sum of the cells, the sum of boom in the hint row/column
function displayRowSum(x) {
    let displayRow = "";
    let idRow = "h" + x + 5;
    displayRow += getSumCellRow(x) + "<br>" + getBoomRow(x);
    document.getElementById(idRow).innerHTML = displayRow;
}

function displayColSum(x) {
    let displayCol = "";
    let idCol = "h" + 5 + x;
    displayCol += getSumCellCol(x) + "<br>" + getBoomCol(x);
    document.getElementById(idCol).innerHTML = displayCol;
}

function hintBoard() {
    for (let i = 0; i < 5; i++) {
        displayRowSum(i);
        displayColSum(i);
    }
}

//Set the value of cell
function setCellValue(i, j) {
    let data = Math.floor(Math.random() * 4);
    cell[i][j] = data;
}

//Set value for all cell
function creatArrayCellValue() {
    for (let i = 0; i < 5; i++) {
        cell[i] = [];
        for (let j = 0; j < 5; j++) {
            if (cell[i][j] != 0) {
                setCellValue(i, j);
            }
        }
    }
}

//When you click a cell
function clickAction(i, j) {
    reveal(i, j);
    checkValue(i, j);
}

//Display the value of flipped cell
function reveal(i, j) {
    arrBoard[i][j] = cell[i][j];
    drawBoard();
}

//Lose or continue? You will lose if you flip a 0-value cell.
function checkValue(i, j) {
    if (cell[i][j] == 0) {
        alert("You LOST!!!");
        revealBoard();
        return 1;
    }
    if (cell[i][j] == 2 || cell[i][j] == 3) {
        countCell23++;
        checkWin();
    }
}

//Show board if you lose or win.
function revealBoard() {
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            arrBoard[i][j] = cell[i][j];
        }
    }
    drawBoard();
}

//Check win condition
//Count the amount of the 2- and 3-value cell.
function amountCell23() {
    let cnt = 0;
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
            if (cell[i][j] == 2) {
                cnt++;
            }
            if (cell[i][j] == 3) {
                cnt++;
            }
        }
    }
    return cnt;
}

//You will win if you uncover all the 2- or 3-value cells.
function checkWin() {
    const N = amountCell23();
    if (countCell23 == N) {
        alert("Congratulation! You WIN!!!");
        revealBoard();

    }
}

//Restart game
function restartGame() {

}

//Level-up game
let boomNumber = 6;

function setBoomLocation() {
    let a = boomNumber;
    //xet vi tri random cua Row
    for (let i = 0; i < boomNumber; i++) {
        let a = Math.floor(Math.random() * 5);
        let b = Math.floor(Math.random() * 5);
        if (cell[a][b] != 0) {
            cell[a][b] = 0;
        } else {
            boomNumber++;
        }
    }
    boomNumber = a;
}


function levelUpGame() {
    boomNumber++;
    setBoomLocation();
}