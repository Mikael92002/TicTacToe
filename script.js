
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
    });






    //Player assigning logic:
    const playerOneButtonDiv = document.createElement("button");
    const playerTwoButtonDiv = document.createElement("button");
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

        playerOneButtonDiv.textContent = playerOneMarker;
        playerOneButtonDiv.style.backgroundColor = "green";
        playerOneButtonDiv.style.border = "none";
        playerOneButtonDiv.style.padding = "5px";
        playerTwoButtonDiv.textContent = playerTwoMarker;
        playerTwoButtonDiv.style.backgroundColor = "blueviolet";
        playerTwoButtonDiv.style.padding = "5px";
        playerTwoButtonDiv.style.border = "none";
        nameOneDiv.appendChild(playerOneButtonDiv);
        nameTwoDiv.appendChild(playerTwoButtonDiv);
    }

    startButton.addEventListener("click", () => {
        playerOneName = playerOneInputField.value;
        playerTwoName = playerTwoInputField.value;
        playerAssignmentClick();
        selectionButtons.forEach(button => {
            button.disabled = true;
        });
        startButton.disabled = true;
        gameButtons.forEach(button => {
            button.disabled = false;
        });
    });
   
        
    

    let activeMarker;

    const currentPlayerButton = () => {
        if (playerOne.turn) {
            activeMarker = playerOne.playerMarker;
            playerOne.turn = !playerOne.turn;
            playerTwo.turn = !playerTwo.turn;
            playerOneButtonDiv.style.backgroundColor = "blueViolet";
            playerTwoButtonDiv.style.backgroundColor = "green";
            return activeMarker;
        }
        else {
            activeMarker = playerTwo.playerMarker;
            playerOne.turn = !playerOne.turn;
            playerTwo.turn = !playerTwo.turn;
            playerOneButtonDiv.style.backgroundColor = "green";
            playerTwoButtonDiv.style.backgroundColor = "blueViolet";
            return activeMarker;
        }
    }

    //Button-clicking logic:
    gameButtons.forEach(button => {
        button.disabled = true;
        button.addEventListener("click", (event) => {
            if (playerWin) {

                return;
            }
            button.style.fontSize = "100px";
            button.style.fontWeight = "900";

            if (!gameBoard.arr.includes(event.target.id)) {
                gameBoard.arr[event.target.id] = event.target.id;
                if (playerOne.turn) {
                    playerOne.gridPlace.push(event.target.id);
                }
                else {
                    playerTwo.gridPlace.push(event.target.id);
                }
                button.textContent = currentPlayerButton();
                if (button.textContent === "X") {
                    button.style.color = "rgb(255, 221, 0)";
                }
                else button.style.color = "rgb(118, 228, 255)";
            }

            winCheck(playerOne);
            winCheck(playerTwo);
            if (playerWin) {
                nameOneDiv.textContent = playerOne.name + ": " + playerOne.score + " ";
                nameTwoDiv.textContent = playerTwo.name + ": " + playerTwo.score + " ";

                playerOneButtonDiv.textContent = playerOneMarker;
                playerOneButtonDiv.style.backgroundColor = "green";
                playerOneButtonDiv.style.border = "none";
                playerOneButtonDiv.style.padding = "5px";
                playerTwoButtonDiv.textContent = playerTwoMarker;
                playerTwoButtonDiv.style.backgroundColor = "blueviolet";
                playerTwoButtonDiv.style.padding = "5px";
                playerTwoButtonDiv.style.border = "none";
                nameOneDiv.appendChild(playerOneButtonDiv);
                nameTwoDiv.appendChild(playerTwoButtonDiv);
            }
        })
    });

    function winCheck(player) {
        if (player.gridPlace.includes("0") && player.gridPlace.includes("1") && player.gridPlace.includes("2")) {
            player.score++;
            playerWin = true;
        }
        else if (player.gridPlace.includes("3") && player.gridPlace.includes("4") && player.gridPlace.includes("5")) {
            player.score++;
            playerWin = true;
        }
        else if (player.gridPlace.includes("6") && player.gridPlace.includes("7") && player.gridPlace.includes("8")) {
            player.score++;
            playerWin = true;
        }
        else if (player.gridPlace.includes("2") && player.gridPlace.includes("4") && player.gridPlace.includes("6")) {
            player.score++;
            playerWin = true;
        }
        else if (player.gridPlace.includes("0") && player.gridPlace.includes("4") && player.gridPlace.includes("8")) {
            player.score++;
            playerWin = true;
        }
        else if (player.gridPlace.includes("2") && player.gridPlace.includes("5") && player.gridPlace.includes("8")) {
            player.score++;
            playerWin = true;
        }
        else if (player.gridPlace.includes("0") && player.gridPlace.includes("3") && player.gridPlace.includes("6")) {
            player.score++;
            playerWin = true;
        }
        else if (player.gridPlace.includes("1") && player.gridPlace.includes("4") && player.gridPlace.includes("7")) {
            player.score++;
            playerWin = true;
        }
    }


})();

const gameBoard = (function () {

    //"game state" logic:
    let arr = [];

    return { arr };
})();

