const gameData = { maxRounds: 5, currentRound: 0, humanScore: 0, compScore: 0, tie: 0 };

function computerPlay() {
    let selection = ["ROCK", "PAPER", "SCISSORS"];
    return selection[Math.floor(Math.random() * 3)];
}

function showFinalResults() {
    let gameDiv = document.querySelector(".game");
    // @ts-ignore
    gameDiv.hidden = true;

    let resultsDiv = document.querySelector(".final-result");
    // @ts-ignore
    resultsDiv.hidden = false;

    let h2 = document.querySelector(".final-result-text");

    if (gameData.humanScore > gameData.compScore) {
        h2.textContent = "Excellent you WIN!! 🥳";
    } else if (gameData.humanScore < gameData.compScore) {
        h2.textContent = "Oh no you loose 😢. \n Try again, this time the computer will be good with you 🤖";
    } else {
        h2.textContent = "No one won no one loose, this time is a tie 🤷"
    }

    let finalHumanScore = document.querySelector(".final-result .human");
    finalHumanScore.textContent = "You: " + gameData.humanScore.toString() + " wins";

    let finalComputerScore = document.querySelector(".final-result .computer");
    finalComputerScore.textContent = "Computer: " + gameData.compScore.toString() + " wins";

    let btnRestart = document.querySelector(".final-result .restart");

    let divGame = document.querySelector(".game");
    let divResults = document.querySelector(".final-result");

    btnRestart.addEventListener("click", () => configureGame(divGame, divResults, 1));
    btnRestart.focus();

}

function showPartialResults(playerSelection, computerSelection, message) {
    let divChoice = document.querySelector(".game .choice");
    divChoice.hidden = true;

    let divVersusResults = document.querySelector(".game .versus-results");
    divVersusResults.hidden = false;

    let imgHumanChoice = document.querySelector(".game .human-choice");
    imgHumanChoice.setAttribute("src", "img/" + playerSelection.toLowerCase() + ".png");

    let imgComputerChoice = document.querySelector(".game .computer-choice");
    imgComputerChoice.setAttribute("src", "img/" + computerSelection.toLowerCase() + ".png");

    let txtResults = document.querySelector(".game .text-result");
    txtResults.textContent = message;

    let humanPartialScore = document.querySelector(".game .human-partial-score");
    humanPartialScore.textContent = "You: " + gameData.humanScore.toString();

    let computerPartialScore = document.querySelector(".game .computer-partial-score");
    computerPartialScore.textContent = "Computer: " + gameData.compScore.toString();

    let tiePartialScore = document.querySelector(".game .tie");
    tiePartialScore.textContent = "Tie: " + gameData.tie.toString();

    let divNextRound = document.querySelector(".game .action");
    divNextRound.hidden = false;

    divNextRound.focus();

    //FALTA DEFINIR COMO SE CARGARA EL SEGUNDO, TERCER, CUARTO Y QUITO ROUND
    //SE DEBE LLAMAR ALGUNA DE LAS FUNCIONES YA DEFINIDAS PARA QUE PUEDA VOLVER AL 
    //CARGARSE LA PARTIDAD PARA EL JUEGO PERO SIN REINICIAR EL SCORE DEL JUEGO EN CURSO
}

function showResults(winner, message, playerSelection, computerSelection) {
    if (winner === 1) {
        gameData.compScore++;
    } else if (winner === 2) {
        gameData.humanScore++;
    } else if (winner === 0) {
        gameData.tie++;
    }

    if (gameData.currentRound < gameData.maxRounds) {
        showPartialResults(playerSelection, computerSelection, message);
    } else {
        showFinalResults();
    }
}

function playRound(e) {

    gameData.currentRound++;

    let playerSelection = e.target.value;
    if (!playerSelection) {
        playerSelection = e.target.parentNode.value;
    }

    let computerSelection = computerPlay();

    //setting that the game couldnt continue
    let roundResult = [-1, "Could't play at all."];

    if (playerSelection === computerSelection) {
        roundResult = [0, "Tie! Both selected " + computerSelection + "."]
    } else {

        switch (playerSelection) {
            case "ROCK":

                if (computerSelection === "SCISSORS") {
                    roundResult = [2, "You won! Rock beats Sicssors."]
                } else if (computerSelection === "PAPER") {
                    roundResult = [1, "You lose! Paper beats Rock."]
                }

                break;
            case "PAPER":

                if (computerSelection === "SCISSORS") {
                    roundResult = [1, "You lose! Sicssors beat Paper."]
                } else if (computerSelection === "ROCK") {
                    roundResult = [2, "You won! Paper beats Rock."]
                }

                break;

            case "SCISSORS":
                if (computerSelection === "PAPER") {
                    roundResult = [2, "You won! Scissors beat Paper"]
                } else if (computerSelection === "ROCK") {
                    roundResult = [1, "You lose! Rock beats Sicssors."]
                }

                break;
            default:
                roundResult = [-1, "Cannot recognize your selection: " + playerSelection];

                break;
        }
    }

    showResults(roundResult[0], roundResult[1], playerSelection, computerSelection)

}

function setGameUI(divGame, divFinalResults) {

    divGame.hidden = false;
    divFinalResults.hidden = true;

    let divWelcome = document.querySelector(".welcome");
    divWelcome.hidden = true;

    let divresults = document.querySelector(".game .versus-results");
    // @ts-ignore
    divresults.hidden = true;

    let divActionButton = document.querySelector(".game .action");
    divActionButton.hidden = true;

    let title = document.querySelector(".game .title");
    title.textContent = "Round " + (gameData.currentRound + 1).toString() + " of " + gameData.maxRounds.toString();

    document.querySelector(".partial-score-title").textContent = "Partial Score:";
    document.querySelector(".human-partial-score").textContent = "You: " + gameData.humanScore.toString();
    document.querySelector(".computer-partial-score").textContent = "Computer: " + gameData.compScore.toString();
}

function configureNextRound() {

    let divChoice = document.querySelector(".game .choice");
    divChoice.hidden = false;

    let divGame = document.querySelector(".game");
    divGame.hidden = true;

    let divFinalResults = document.querySelector(".final-result");
    divFinalResults.hidden = true;

    setGameUI(divGame, divFinalResults);
}

//Sets the initial UI and game parameters to start playing from the first round.
function configureGame(divGame, divFinalResults, restartGame) {
    gameData.currentRound = 0;
    gameData.humanScore = 0;
    gameData.compScore = 0;
    gameData.tie = 0;

    setGameUI(divGame, divFinalResults);

    if (!restartGame) {
        let buttons = document.querySelectorAll(".game .btn");
        buttons.forEach(button => button.addEventListener("click", playRound));

        let btnNextRound = document.querySelector(".game .next-game");
        btnNextRound.textContent = "Next round";
        btnNextRound.addEventListener("click", configureNextRound);
    }
}

//Sets the Welcome UI so the user can decide when to start.
function start() {
    let divGame = document.querySelector(".game");
    divGame.hidden = true;

    let divFinalResults = document.querySelector(".final-result");
    divFinalResults.hidden = true;

    let btnStartGame = document.querySelector(".start");
    btnStartGame.addEventListener("click", () => configureGame(divGame, divFinalResults, 0));
    btnStartGame.focus();

}

start();