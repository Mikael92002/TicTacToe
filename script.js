
const displayController = (function () {
    //screen updating logic:



})();

const gameLogic = (function () {
    //Button-clicking logic:
    const gameButtons = document.querySelectorAll(".game-button");
    gameButtons.forEach(button => {
        button.addEventListener("click", (event) => {

            if (!gameBoard.arr.includes(event.target.id)) {
                gameBoard.arr.push(event.target.id);
            }
            for (let i = 0; i < gameBoard.arr.length; i++) {
                console.log(gameBoard.arr[i]);
            }
        })
    });
    //player name/icon extracting logic:
    const startButton = document.querySelector("#start-button");
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
    function playerAssignmentClick() {
        const nameOneDiv = document.querySelector("#nameOne");
        const nameTwoDiv = document.querySelector("#nameTwo");

        const assignPlayer = (name, marker) => {
            const playerName = name;
            const playerMarker = marker;
            let score = 0;
            return { name, playerMarker, score };
        }

        const playerOne = assignPlayer(playerOneName, playerOneMarker);
        const playerTwo = assignPlayer(playerTwoName, playerTwoMarker);
        nameOneDiv.textContent = playerOne.name + ": " + playerOne.score;
        nameTwoDiv.textContent = playerTwo.name + ": " + playerTwo.score;
    }

    startButton.addEventListener("click", () => {
        playerOneName = playerOneInputField.value;
        playerTwoName = playerTwoInputField.value;
        playerAssignmentClick();
        document.querySelectorAll(".selection").forEach(button => {
            button.disabled = true;
        });
        startButton.disabled = true;
    });

    //tictactoe grid clicking logic:
    



    const selectorDiv = document.createElement("div");
    selectorDiv.textContent = "Select your marker: ";
    const body = document.querySelector("body");

    
})();

const gameBoard = (function () {

    //"game state" logic:
    let arr = [];

    return { arr };
})();

