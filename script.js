
const displayController = (function () {
    //screen updating logic:


})();

const gameLogic = (function () {
    //gameButtons and playerWin defined here because of regular use:
    const gameButtons = document.querySelectorAll(".game-button");
    let playerWin = false;
    //player name/icon extracting logic:
    const startButton = document.querySelector("#start-button");
    const restartButton = document.querySelector("#restart-button");
    const continueButton = document.querySelector("#continue-button");
    const selectionButtons = document.querySelectorAll(".selection");
    const playerOneInputField = document.querySelector(".player-one-name");
    const playerTwoInputField = document.querySelector(".player-two-name");
    const playerInputContainer = document.querySelector("#player-name-input-container");


    let playerOneName;
    let playerTwoName;

    let playerOneMarker;
    let playerTwoMarker;


    playerInputContainer.addEventListener("click", (event) => {
        if (event.target.classList.contains("one-marker-x")) {
            playerOneMarker = "X";
            playerTwoMarker = "O";
            event.target.style.backgroundColor = "green";
            document.querySelector(".one-marker-o").style.backgroundColor = "blueviolet";
            document.querySelector(".two-marker-o").style.backgroundColor = "green";
            document.querySelector(".two-marker-x").style.backgroundColor = "blueviolet";
            startButton.disabled = false;
        }
        if (event.target.classList.contains("one-marker-o")) {
            playerOneMarker = "O";
            playerTwoMarker = "X";
            event.target.style.backgroundColor = "green";
            document.querySelector(".one-marker-x").style.backgroundColor = "blueviolet";
            document.querySelector(".two-marker-x").style.backgroundColor = "green";
            document.querySelector(".two-marker-o").style.backgroundColor = "blueviolet";
            startButton.disabled = false;
        }
        if (event.target.classList.contains("two-marker-x")) {
            playerOneMarker = "O";
            playerTwoMarker = "X";
            event.target.style.backgroundColor = "green";
            document.querySelector(".one-marker-x").style.backgroundColor = "blueviolet";
            document.querySelector(".one-marker-o").style.backgroundColor = "green";
            document.querySelector(".two-marker-o").style.backgroundColor = "blueviolet";
            startButton.disabled = false;
        }
        else if (event.target.classList.contains("two-marker-o")) {
            playerOneMarker = "X";
            playerTwoMarker = "O";
            event.target.style.backgroundColor = "green";
            document.querySelector(".one-marker-o").style.backgroundColor = "blueviolet";
            document.querySelector(".one-marker-x").style.backgroundColor = "green";
            document.querySelector(".two-marker-x").style.backgroundColor = "blueviolet";
            startButton.disabled = false;
        }
    });






    //Player assigning logic:
    const playerOneButton = document.createElement("button");
    const playerTwoButton = document.createElement("button");
    const nameOneWrapperDiv = document.querySelector("#nameOneWrapper");
    const nameTwoWrapperDiv = document.querySelector("#nameTwoWrapper");
    const nameOneDiv = document.querySelector("#nameOne");
    const nameTwoDiv = document.querySelector("#nameTwo");

    let playerOne;
    let playerTwo;

    function playerAssignmentClick() {

        const assignPlayer = (name, marker) => {
            const playerName = name;
            const playerMarker = marker;
            let score = 0;
            let turn;
            let gridPlace = [];
            return { name, playerMarker, score, turn, gridPlace };
        }

        playerOne = assignPlayer(playerOneName, playerOneMarker);
        playerTwo = assignPlayer(playerTwoName, playerTwoMarker);
        playerOne.turn = true;
        playerTwo.turn = false;
        nameOneDiv.textContent = playerOne.name + ": " + playerOne.score + " ";
        nameTwoDiv.textContent = playerTwo.name + ": " + playerTwo.score + " ";

        playerOneButton.textContent = playerOneMarker;
        playerOneButton.style.backgroundColor = "green";
        playerOneButton.style.border = "none";
        playerOneButton.style.padding = "5px";
        playerTwoButton.textContent = playerTwoMarker;
        playerTwoButton.style.backgroundColor = "blueviolet";
        playerTwoButton.style.padding = "5px";
        playerTwoButton.style.border = "none";
        nameOneWrapperDiv.appendChild(playerOneButton);
        nameTwoWrapperDiv.appendChild(playerTwoButton);
    }

    startButton.addEventListener("click", () => {
        if (playerOneInputField.value.trim() === "") {
            playerOneName = "Player 1";
            playerOneInputField.value = playerOneName;
        }
        else {
            playerOneName = playerOneInputField.value;
        }
        if (playerTwoInputField.value.trim() === "") {
            playerTwoName = "Player 2";
            playerTwoInputField.value = playerTwoName;
        }
        else {
            playerTwoName = playerTwoInputField.value;
        }
        playerAssignmentClick();
        selectionButtons.forEach(button => {
            button.disabled = true;
        });
        startButton.disabled = true;
        gameButtons.forEach(button => {
            button.disabled = false;
        });
        playerOneInputField.disabled = true;
        playerTwoInputField.disabled = true;
    });
    restartButton.addEventListener("click", () => {
        if (playerOne === undefined) return;
        playerOne.gridPlace.length = 0;
        playerTwo.gridPlace.length = 0;
        gameBoard.arr.length = 0;
        gameButtons.forEach(button => {
            button.textContent = "";
            playerWin = false;
        })
    })





    let activeMarker;

    const currentPlayerButton = () => {
        if (playerOne.turn) {
            activeMarker = playerOne.playerMarker;
            playerOne.turn = false;
            playerTwo.turn = true;
            playerOneButton.style.backgroundColor = "blueViolet";
            playerTwoButton.style.backgroundColor = "green";
            return activeMarker;
        }
        else {
            activeMarker = playerTwo.playerMarker;
            playerOne.turn = true;
            playerTwo.turn = false;
            playerOneButton.style.backgroundColor = "green";
            playerTwoButton.style.backgroundColor = "blueViolet";
            return activeMarker;
        }
    }

    //Button-clicking logic:
    const dialog = document.querySelector("dialog");
    const winningPlayerDiv = document.querySelector("#winning-player");

    gameButtons.forEach(button => {
        button.disabled = true;
        button.addEventListener("click", (event) => {
            if (playerWin) {
                return;
            }
            button.style.fontSize = "7rem";
            button.style.fontWeight = "900";

            if (!gameBoard.arr.includes(event.target.id)) {
                gameBoard.arr.push(event.target.id);
                if (playerOne.turn) {
                    playerOne.gridPlace.push(event.target.id);
                }
                else {
                    playerTwo.gridPlace.push(event.target.id);
                }
                //SWITCHES TURNS:
                button.textContent = currentPlayerButton();
                if (button.textContent === "X") {
                    button.style.color = "rgb(255, 221, 0)";
                }
                else button.style.color = "rgb(118, 228, 255)";
            }
            const winningPlayerOne = winCheck(playerOne);
            const winningPlayerTwo = winCheck(playerTwo);


            if (playerWin) {
                nameOneDiv.textContent = playerOne.name + ": " + playerOne.score + " ";
                nameTwoDiv.textContent = playerTwo.name + ": " + playerTwo.score + " ";
                if (winningPlayerOne !== undefined) {
                    winningPlayerDiv.textContent = playerOne.name + " wins!";
                }
                else if (winningPlayerTwo !== undefined) {
                    winningPlayerDiv.textContent = playerTwo.name + " wins!";
                }
                dialog.showModal();
            }
            else if (!playerWin && gameBoard.arr.length === 9) {
                winningPlayerDiv.textContent = "It's a draw!";
                dialog.showModal();
            }
        })
    });

    continueButton.addEventListener("click", () => {
        if (playerOne === undefined) return;
        playerOne.gridPlace.length = 0;
        playerTwo.gridPlace.length = 0;
        gameBoard.arr.length = 0;
        gameButtons.forEach(button => {
            button.textContent = "";
            playerWin = false;
        })
        winningPlayerDiv.textContent = "";
        dialog.close();
    });

    function winCheck(player) {
        if (player.gridPlace.includes("0") && player.gridPlace.includes("1") && player.gridPlace.includes("2")) {
            player.score++;
            playerWin = true;
            return player;
        }
        else if (player.gridPlace.includes("3") && player.gridPlace.includes("4") && player.gridPlace.includes("5")) {
            player.score++;
            playerWin = true;
            return player;
        }
        else if (player.gridPlace.includes("6") && player.gridPlace.includes("7") && player.gridPlace.includes("8")) {
            player.score++;
            playerWin = true;
            return player;
        }
        else if (player.gridPlace.includes("2") && player.gridPlace.includes("4") && player.gridPlace.includes("6")) {
            player.score++;
            playerWin = true;
            return player;
        }
        else if (player.gridPlace.includes("0") && player.gridPlace.includes("4") && player.gridPlace.includes("8")) {
            player.score++;
            playerWin = true;
            return player;
        }
        else if (player.gridPlace.includes("2") && player.gridPlace.includes("5") && player.gridPlace.includes("8")) {
            player.score++;
            playerWin = true;
            return player;
        }
        else if (player.gridPlace.includes("0") && player.gridPlace.includes("3") && player.gridPlace.includes("6")) {
            player.score++;
            playerWin = true;
            return player;
        }
        else if (player.gridPlace.includes("1") && player.gridPlace.includes("4") && player.gridPlace.includes("7")) {
            player.score++;
            playerWin = true;
            return player;
        }
    }


})();

const gameBoard = (function () {

    //"game state" logic:
    let arr = [];

    return { arr };
})();

