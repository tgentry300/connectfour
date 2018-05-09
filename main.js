let gameBoard = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0],
]

let columns = document.getElementsByClassName("columns")
let clickMode = "playerone"
const winner = document.getElementById("winner")
const wrapper = document.getElementById("wrapper")
//Place Circle

function placeCircle() {
    let redCircle = document.createElement("div")
    let blackCircle = document.createElement("div")
    let clickedColumn = event.currentTarget
    redCircle.setAttribute("id", "redCircle")
    blackCircle.setAttribute("id", "blackCircle")
    const columnId = clickedColumn.dataset.id
    const rowId = 5 - clickedColumn.childElementCount


    if (clickMode == "playerone") {
        clickedColumn.appendChild(redCircle)
        gameBoard[rowId][columnId] = 1
        clickMode = "playertwo"
    } else {
        clickedColumn.appendChild(blackCircle)
        gameBoard[rowId][columnId] = 2
        clickMode = "playerone"
    }
    checkWinner()
}

function checkWinner() {
    if (checkVertical() || checkHorizontal() || checkDiagonalDownLeft() || checkDiagonalDownRight() == true) {
        if (clickMode === "playertwo") {
            winner.textContent = ("Red Wins!")
        } else {
            winner.textContent = ("Black Wins!")
            }
        }
    }


//Place piece on board

function playGame(event) {
    clickedColumn = event.currentTarget
    if (clickedColumn.childElementCount < 6) {
        placeCircle()
    } else {
        alert("Column Full, Please Try Again!")
    }
}




//Click Event

for (let column of columns) {
    column.addEventListener("click", playGame)
}



/////////Win Conditions

//Function to check for horizontal win condition

const edgeY = gameBoard.length - 3
const edgeX = gameBoard[0].length - 3;
function checkHorizontal() {
    for (let y = 0; y < gameBoard.length; y++) {
        let row = gameBoard[y];
        for (let x = 0; x < edgeX; x++) {
            let cell = row[x];
            if (cell !== 0) {
                if (cell === gameBoard[y][x + 1] && cell === gameBoard[y][x + 2] && cell === gameBoard[y][x + 3]) {
                    return true
                }
            }
        }
    }
}

//Function to check for vertical win condition      
function checkVertical() {
    for (let y = 0; y < edgeY; y++) {
        for (let x = 0; x < gameBoard[0].length; x++) {
            cell = gameBoard[y][x];
            if (cell !== 0) {
                if (cell === gameBoard[y + 1][x] && cell === gameBoard[y + 2][x] && cell === gameBoard[y + 3][x]) {
                    return true
                }
            }
        }
    }
}


//Function to check for diagonal win condition
function checkDiagonalDownRight() {
    for (let y = 0; y < edgeY; y++) {

        for (let x = 0; x < edgeX; x++) {
            cell = gameBoard[y][x];

            if (cell !== 0) {

                if (cell === gameBoard[y + 1][x + 1] && cell === gameBoard[y + 2][x + 2] && cell === gameBoard[y + 3][x + 3]) {
                    return true
                }
            }
        }
    }
}


function checkDiagonalDownLeft() {
    for (let y = 2; y < gameBoard.length; y++) {

        for (let x = 0; x < edgeX; x++) {
            cell = gameBoard[y][x];

            if (cell !== 0) {

                if (cell === gameBoard[y - 1][x + 1] && cell === gameBoard[y - 2][x + 2] && cell === gameBoard[y - 3][x + 3]) {
                    return true
                }
            }
        }
    }
}