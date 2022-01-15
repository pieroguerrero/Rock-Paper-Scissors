function computerPlay() {
    let selection = ["Rock", "Paper", "Scissors"];
    return selection[Math.floor(Math.random() * 3)];
}

function playRound(playerSelection, computerSelection) {

    let roundResult = [-1, "Could't play at all."];
    computerSelection
    if (playerSelection.toUpperCase() === computerSelection.toUpperCase()) {
        roundResult = [0, "Tie! Both selected " + computerSelection + "."]
    } else {

        switch (playerSelection.toUpperCase()) {
            case "ROCK":

                if (computerSelection === "Scissors") {
                    roundResult = [2, "You won! Rock beats Sicssors."]
                } else if (computerSelection === "Paper") {
                    roundResult = [1, "You lose! Paper beats Rock."]
                }

                break;
            case "PAPER":

                if (computerSelection === "Scissors") {
                    roundResult = [1, "You lose! Sicssors beat Paper."]
                } else if (computerSelection === "Rock") {
                    roundResult = [2, "You won! Paper beats Rock."]
                }

                break;

            case "SCISSORS":
                if (computerSelection === "Paper") {
                    roundResult = [2, "You won! Scissors beat Paper"]
                } else if (computerSelection === "Rock") {
                    roundResult = [1, "You lose! Rock beats Sicssors."]
                }

                break;
            default:
                roundResult = [-1, "Cannot recognize your selection: " + playerSelection];

                break;
        }
    }

    return roundResult;
}

function game() {

    let playerScore = 0;
    let computerScore = 0;

    for (let i = 0; i < 5; i++) {

        playerSelection = prompt((i + 1).toString() + " -> Please, insert your choice (Rock, Paper or Scissors):")

        let result = playRound(playerSelection, computerPlay());

        if (result[0] === 2) {
            playerScore++;
        } else if (result[0] === 1) {
            computerScore++;
        }

        console.log("Resultado #" + (i + 1).toString() + ": " + result[1]);

        alert(result[1]);

    }

    console.log("Resultado final-->");
    console.log("You won: " + playerScore.toString() + " times.");
    console.log("The computer won: " + computerScore.toString() + " times.");

}

game();