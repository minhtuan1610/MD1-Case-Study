let arrBoard = []; /* Use for creating game board */
let cell = []; /* Variable used for creating the value of cells*/
let countCell23 = 0; /*Variable used for count the amount of the 2- or 3-value cell to check win condition*/
let boomNumber = 6; /*The total booms in game-board at level 1.*/
let level = [6, 7, 8, 9, 10];
let cntLevel = 0;

//Create a game board
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
        board += "<td class='hintBoard''>";
        board += "<div id='h" + i + 5 + "'>" + "</div>";
        board += "</td>";
        board += "</tr>";
    }
    board += "<tr>";
    for (let i = 0; i < 5; i++) {
        board += "<td class='hintBoard'>";
        board += "<div id='h" + 5 + i + "'>" + "</div>";
        board += "</td>";
    }
    board += "</tr>";
    board += "</table>";
    document.getElementById("gameBoard").innerHTML = board;
    hintBoard();
}

//Hint Board. It will show the total booms and the total value of the cells (safe-spots).
function hintBoard() {
    for (let i = 0; i < 5; i++) {
        displayRowSum(i);
        displayColSum(i);
    }
}

//Show the sum of the cells, the sum of boom in the hint row/column
function displayRowSum(x) {
    let displayRow = "";
    let idRow = "h" + x + 5;
    displayRow += "<em>" + getSumCellRow(x) + "</em>" + "<br>" + "<strong>" + getBoomRow(x) + "</strong>";
    document.getElementById(idRow).innerHTML = displayRow;
}

function displayColSum(x) {
    let displayCol = "";
    let idCol = "h" + 5 + x;
    displayCol += "<em>" + getSumCellCol(x) + "</em>" + "<br>" + "<strong>" + getBoomCol(x) + "</strong>";
    document.getElementById(idCol).innerHTML = displayCol;
}

//Create the sum of cells and the sum of booms
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

//Random vi tri cua boom trong bang
function setBoomLocation() {
    let temp = boomNumber;
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
    boomNumber = temp;
}

//Create the value of cell.
//Set the value of each cell
function setCellValue(i, j) {
    let data = Math.floor(Math.random() * 3) + 1;
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

//Check condition (Win or Lose)
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

//Check victory condition?
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

//Win condition: all the 2- or 3-value cells are uncovered.
function checkWin() {
    const N = amountCell23();
    if (countCell23 == N) {
        alert("Congratulation! You WIN!!!");
        revealBoard();
    }
}

//Start the game
function startGame() {
    creatBoardInfo();
    creatArrayCellValue();
    setBoomLocation();
    drawBoard();
    displayLevel();
}

//Show the current level
function displayLevel() {
    document.getElementById("level").innerText = "Level: " + (cntLevel + 1);
}

//Raise the level of the game board
function selectLevel() {
    let ctx = prompt("Nhập số tương ứng từ 1-5 để chọn level mong muốn. Nhập 0 để thoát");
    let temp = cntLevel;
    cntLevel = parseInt(ctx) - 1;
    switch (cntLevel) {
        case -1:
            cntLevel = temp;
            break;
        case 0: /*corresponding to the index of array Level*/
        case 1: /*corresponding to the index of array Level*/
        case 2: /*corresponding to the index of array Level*/
        case 3: /*corresponding to the index of array Level*/
        case 4: /*corresponding to the index of array Level*/
            boomNumber = level[cntLevel];
            startGame();
            displayLevel();
            break;
        default:
            alert("Có mỗi việc nhập mà cũng sai. Nhập lại đi -.-");
            selectLevel();
    }
    console.log(boomNumber);
}

//Play again at the current level
function playAtSameLevel() {
    boomNumber;
    startGame();
    console.log(boomNumber);
}

//Restart game
function restartGame() {
    cntLevel = 0;
    startGame();
    console.log(boomNumber);
}