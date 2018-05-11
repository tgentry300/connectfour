const config = {}
config.rowCount = 6
config.columnCount = 7
config.edgeY = config.rowCount - 3
config.edgeX = config.columnCount - 3

gameBoard = createBlankGameboard()

const columns = document.getElementsByClassName("columns")
const winner = document.getElementById("winner")
const redWinCount = document.getElementById("redWinCount")
const blackWinCount = document.getElementById("blackWinCount")
const counterTitle = document.getElementById("counterTitle")

let winCounter = {
    redWins: 0,
    blackWins: 0,
}
let clickMode = "playerone"

alert("Red goes first, click a column to place your piece!")
//Place Circle
function placeCircle(event) {
    let redCircle = document.createElement("img")
    redCircle.setAttribute("src", "redchecker.png")
    redCircle.setAttribute("id", "redCircle")
    let blackCircle = document.createElement("img")
    blackCircle.setAttribute("src", "blackchecker.png")
    blackCircle.setAttribute("id", "blackCircle")
    let clickedColumn = event.currentTarget
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
    // console.log(gameBoard)
}

function resetGame() {
    clickMode = "playerone"
    winner.style.display = "none"
    gameBoard = createBlankGameboard()

    for (let column of columns) {
        column.innerHTML = ""
    }
    addClickiness()
}

function checkWinner() {
    if (checkVertical() || checkHorizontal() || checkDiagonalDownLeft() || checkDiagonalDownRight()) {
        removeClickiness()
        winner.style.display = "block"
        if (clickMode === "playertwo") {
            winner.textContent = "Red Wins!"
            winner.style.color = "red"
            winCounter.redWins++
        } else {
            winner.textContent = "Black Wins!"
            winner.style.color = "black"
            winCounter.blackWins++
        }
        setTimeout(resetGame, 3000)
        counterTitle.textContent = "Win Counter"
        redWinCount.textContent = "Red Wins: " + winCounter.redWins
        blackWinCount.textContent = "Black Wins: " + winCounter.blackWins
    }
}


//Place piece on board

function playGame(event) {
    clickedColumn = event.currentTarget
    if (clickedColumn.childElementCount < 6) {
        placeCircle(event)
    } else {
        alert("Column Full, Please Try Again!")
    }
}




//Click Event
function addClickiness() {
    for (let column of columns) {
        column.addEventListener("click", playGame)
    }
}

function removeClickiness() {
    for (let column of columns) {
        column.removeEventListener("click", playGame)
    }

}


//Win Conditions

//Function to check for horizontal win condition


function checkHorizontal() {
    for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex++) {
        let row = gameBoard[rowIndex];
        for (let columnIndex = 0; columnIndex < config.edgeX; columnIndex++) {
            let cell = row[columnIndex];
            if (cell !== 0) {
                if (cell === gameBoard[rowIndex][columnIndex + 1] && cell === gameBoard[rowIndex][columnIndex + 2] && cell === gameBoard[rowIndex][columnIndex + 3]) {
                    return true
                }
            }
        }
    }
}

//Function to check for vertical win condition      
function checkVertical() {
    for (let rowIndex = 0; rowIndex < config.edgeY; rowIndex++) {
        for (let columnIndex = 0; columnIndex < gameBoard[0].length; columnIndex++) {
            cell = gameBoard[rowIndex][columnIndex];
            if (cell !== 0) {
                if (cell === gameBoard[rowIndex + 1][columnIndex] && cell === gameBoard[rowIndex + 2][columnIndex] && cell === gameBoard[rowIndex + 3][columnIndex]) {
                    return true
                }
            }
        }
    }
}


//Function to check for diagonal win condition
function checkDiagonalDownRight() {
    for (let rowIndex = 0; rowIndex < config.edgeY; rowIndex++) {
        for (let columnIndex = 0; columnIndex < config.edgeX; columnIndex++) {
            cell = gameBoard[rowIndex][columnIndex];
            if (cell !== 0) {
                if (cell === gameBoard[rowIndex + 1][columnIndex + 1] && cell === gameBoard[rowIndex + 2][columnIndex + 2] && cell === gameBoard[rowIndex + 3][columnIndex + 3]) {
                    return true
                }
            }
        }
    }
}


function checkDiagonalDownLeft() {
    for (let rowIndex = 0; rowIndex < gameBoard.length; rowIndex++) {
        for (let columnIndex = 0; columnIndex < config.edgeX; columnIndex++) {
            cell = gameBoard[rowIndex][columnIndex];
            if (cell !== 0) {
                if (cell === gameBoard[rowIndex - 1][columnIndex + 1] && cell === gameBoard[rowIndex - 2][columnIndex + 2] && cell === gameBoard[rowIndex - 3][columnIndex + 3]) {
                    return true
                }
            }
        }
    }
}

function createBlankGameboard() {
    return [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0]
    ]
}

addClickiness()