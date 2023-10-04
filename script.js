const board = document.querySelector("#board");
const info = document.querySelector("#info");
const replay = document.querySelector("#replay");

replay.addEventListener("click", function () {
    location.reload(); // Reload the page
  });

const cellBoard = ["", "", "", "", "", "", "", "", ""];

let firstMove = "X";
let text = info.innerText = `${firstMove} to play`; //initial text

function createBoard(){
    cellBoard.forEach((_cell, index) => {
        const cell = document.createElement("div");
        cell.classList.add("game-cell");
        cell.setAttribute("id", index);
        cell.addEventListener("click", play)
        board.append(cell);
    });
}

createBoard();



function play(e) {
    e.target.append(firstMove); // adds X or O
    firstMove = firstMove === "X" ? "O" : "X"; // switch between X & O
    text = info.innerText = `${firstMove} to play`; //update text
    e.target.removeEventListener("click", play); //remove event listener so same case can't be clicked 2x
    checkWinner(); // check for a winner after every move
}

function checkWinner() {
    const winningCombo = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 4, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8], [2, 4, 6]
    ];

    for (const combo of winningCombo) {
        const [a, b, c] = combo;
        const cellA = document.getElementById(a).innerText;
        const cellB = document.getElementById(b).innerText;
        const cellC = document.getElementById(c).innerText;

        if (cellA && cellA === cellB && cellB === cellC) {
            // We have a winner
            info.textContent = `${cellA} wins!`;
            // Disable further clicks on the board
            disableBoardClicks();
            return;
        }
    }

    // Check for a draw -> "If there are no cells with an empty inner text...and no winner as checked before...It's a draw!"
    if (!Array.from(board.children).some(cell => cell.innerText === "")) {
        info.textContent = "It's a draw!";
        // Disable further clicks on the board
        disableBoardClicks();
    }
}

function disableBoardClicks() {
    const cells = document.querySelectorAll(".game-cell");
    cells.forEach((cell) => {
        cell.removeEventListener("click", play);
    });
}


