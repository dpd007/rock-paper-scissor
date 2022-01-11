const game = () => {
  let playerScore = 0;
  let computerScore = 0;
  let moves = 0;

  const rockBtn = document.querySelector(".rock");
  const paperBtn = document.querySelector(".paper");
  const scissorBtn = document.querySelector(".scissor");
  const rock = rockBtn.getAttribute("rock");
  const paper = rockBtn.getAttribute("paper");
  const scissor = rockBtn.getAttribute("scissor");
  const choicesArr = [rock, paper, scissor];
  const computerChoose = document.querySelector(".computerChoice");
  const playerOptions = [rockBtn, paperBtn, scissorBtn];
  const computerOptions = ["rock", "paper", "scissors"];
  const score = document.querySelector(".score");
  const move = document.querySelector(".move");
  const movesleft = document.querySelector(".movesleft");
  const playGameBtn = document.querySelector("#playGameBtn");
  const turnNumbersInput = document.querySelector("#turn");
  const inputTurnDiv = document.querySelector(".inputTurns");
  const chooseMove = document.querySelector(".move");
  const reloadBtn = document.querySelector(".reload");
  const result = document.querySelector(".result");
  const playerScoreBoard = document.querySelector(".p-count");
  const computerScoreBoard = document.querySelector(".c-count");
  const gameResultDiv = document.querySelector(".gameResult");

  playGameBtn.addEventListener("click", () => {
    playGameBtn.setAttribute("play-game", 1);
    startGame();
  });
  const startGame = () => {
    let turnNumbers = parseInt(turnNumbersInput.value);
    turnNumbersInput.setAttribute("game-number", turnNumbers);
    showGame();
    playGame(turnNumbers);
  };
  const hideGame = () => {
    move.style.display = "none";
    movesleft.style.display = "none";
    rockBtn.style.display = "none";
    paperBtn.style.display = "none";
    scissorBtn.style.display = "none";
    score.style.display = "none";
  };
  const showGame = () => {
    move.style.display = "block";
    movesleft.style.display = "block";
    rockBtn.style.display = "block";
    paperBtn.style.display = "block";
    scissorBtn.style.display = "block";
    score.style.display = "block";
    inputTurnDiv.style.display = "none";
  };
  const playGame = (turnNumbers) => {
    //   console.log("1=>"+turnNumbers);
    playerOptions.forEach((option) => {
      option.addEventListener("click", function () {
        moves++;
        // console.log("2=>"+turnNumbers);
        movesleft.innerText = `Moves Left: ${turnNumbers - moves}`;
        movesleft.setAttribute("rounds-left", `${turnNumbers - moves}`);
        // console.log(movesleft.getAttribute("rounds-left"));
        // movesLeft.innerText = "Moves left: " + turnNumbers;

        const choiceNumber = Math.floor(Math.random() * choicesArr.length);
        // console.log(choiceNumber);
        const computerChoice = computerOptions[choiceNumber];
        setComputerChoice(computerChoice);
        computerChoose.innerText = "Computer chooses " + computerChoice;
        // console.log(computerChoice);
        winner(this.innerText, computerChoice);
        if (moves == turnNumbers) {
          gameOver(playerOptions, movesleft);
        }
      });
    });
  };
  const setComputerChoice = (computerChoice) => {
    // console.log(computerChoice);
    if (computerChoice == 0) {
      rockBtn.setAttribute("computer-choice", computerChoice);
    } else if (computerChoice == 1) {
      paperBtn.setAttribute("computer-choice", computerChoice);
    } else {
      scissorBtn.setAttribute("computer-choice", computerChoice);
    }
  };

  const winner = (player, computer) => {
    player = player.toLowerCase();
    computer = computer.toLowerCase();
    if (player === computer) {
      gameResultDiv.textContent = "Tie";
      gameResultDiv.setAttribute("game-result", -1);
    } else if (player == "rock") {
      if (computer == "paper") {
        gameResultDiv.textContent = "Computer Won";
        computerScore++;
        computerScoreBoard.textContent = computerScore;
        computerScoreBoard.setAttribute("computer-points", computerScore);
        gameResultDiv.setAttribute("game-result", 0);
        // console.log(computerScoreBoard.getAttribute("computer-points"));
      } else {
        gameResultDiv.textContent = "Player Won";
        playerScore++;
        playerScoreBoard.textContent = playerScore;
        playerScoreBoard.setAttribute("user-points", playerScore);
        gameResultDiv.setAttribute("game-result", 1);
        // console.log(playerScoreBoard.getAttribute("user-points"));
      }
    } else if (player == "scissors") {
      if (computer == "rock") {
        gameResultDiv.textContent = "Computer Won";
        computerScore++;
        computerScoreBoard.textContent = computerScore;
        gameResultDiv.setAttribute("game-result", 0);
        // console.log(computerScoreBoard.getAttribute("computer-points"));
      } else {
        gameResultDiv.textContent = "Player Won";
        playerScore++;
        playerScoreBoard.textContent = playerScore;
        playerScoreBoard.setAttribute("user-points", playerScore);
        gameResultDiv.setAttribute("game-result", 1);
        // console.log(playerScoreBoard.getAttribute("user-points"));
      }
    } else if (player == "paper") {
      if (computer == "scissors") {
        gameResultDiv.textContent = "Computer Won";
        computerScore++;
        computerScoreBoard.textContent = computerScore;
        gameResultDiv.setAttribute("game-result", 0);
        // console.log(computerScoreBoard.getAttribute("computer-points"));
      } else {
        gameResultDiv.textContent = "Player Won";
        playerScore++;
        playerScoreBoard.textContent = playerScore;
        playerScoreBoard.setAttribute("user-points", playerScore);
        gameResultDiv.setAttribute("game-result", 1);
        // console.log(playerScoreBoard.getAttribute("user-points"));
      }
    }
    showRoundResult(computerScore, playerScore);
  };
  const showRoundResult = (computerScore, playerScore) => {
    if (playerScore > computerScore) {
      result.setAttribute("round-result", 1);
      result.style.fontSize = "2rem";
      result.innerText = "You Won The Round";
      result.style.color = "#308D46";
    } else if (playerScore < computerScore) {
      result.setAttribute("round-result", 0);
      result.style.fontSize = "2rem";
      result.innerText = "You Lost The Round";
      result.style.color = "red";
    } else {
      result.setAttribute("round-result", -1);
      result.style.fontSize = "2rem";
      result.innerText = "Round Tie";
      result.style.color = "grey";
    }
    reloadBtn.innerText = "Restart";
    reloadBtn.style.display = "flex";
    reloadBtn.addEventListener("click", () => {
      window.location.reload();
    });
  };
  //   after each round the user notified about his/her result
  const gameOver = (playerOptions, movesLeft) => {
    playerOptions.forEach((option) => {
      option.style.display = "none";
    });

    chooseMove.innerText = "Game Over!!";
    movesLeft.style.display = "none";

    if (playerScore > computerScore) {
      result.style.fontSize = "2rem";
      result.innerText = "You Won The Game";
      result.style.color = "#308D46";
    } else if (playerScore < computerScore) {
      result.style.fontSize = "2rem";
      result.innerText = "You Lost The Game";
      result.style.color = "red";
    } else {
      result.style.fontSize = "2rem";
      result.innerText = "Tie";
      result.style.color = "grey";
    }
    reloadBtn.innerText = "Restart";
    reloadBtn.style.display = "flex";
    reloadBtn.addEventListener("click", () => {
      window.location.reload();
    });
  };
  //   playGame();
  hideGame();
};
game();
