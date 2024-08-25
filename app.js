let newGameButton = document.getElementById('new-game');
let continueButton = document.getElementById('continue-button');
let cancelButton = document.getElementById('cancel-button');
let selectedGameMode = '';
let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let typeofgame=document.getElementById("typeofgame")

let turnO = false; //playerX, playerO
let count = 0; //To Track Draw
let isXStarting = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
  ];

const disableBoxes = () => {
    for (let box of boxes) {
      box.disabled = true;
    }
  };


  
const enableBoxes = () => {
    for (let box of boxes) {
      box.disabled = false;
      box.innerText = "";
    }
  };

  boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turnO) {
            box.innerText = "O";
            turnO = false;
        } else {
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;

        let isWinner = checkWinner();

        if (!isWinner && selectedGameMode === "vs-computer" && count < 9) {
            computerMove(); //computer's turn if vs-computer is chosen
        }

        if (count === 9 && !isWinner) {
            gameDraw();
        }
    });
});
const resetGame = () => {
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hide");

    // alternate between x and o
    isXStarting = !isXStarting; 
    turnO = !isXStarting; 

    if (selectedGameMode === "2-player") {
        typeofgame.innerText = "2 - Player";
    } else if (selectedGameMode === "vs-computer") {
        if (turnO) {
            typeofgame.innerText = "VS-Computer, Computer's turn";
            computerMove(); // Computer starts if it's O's turn
        } else {
            typeofgame.innerText = "VS-Computer, your turn";
        }
    }
};



const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
  };
  
const checkWinner = () => {
    for (let pattern of winPatterns) {
      let pos1Val = boxes[pattern[0]].innerText;
      let pos2Val = boxes[pattern[1]].innerText;
      let pos3Val = boxes[pattern[2]].innerText;
  
      if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
        if (pos1Val === pos2Val && pos2Val === pos3Val) {
          showWinner(pos1Val);
          return true;
        }
      }
    }
  };

  const startgame = () => {
    turnO = !isXStarting; // alternating between x and o

    if (selectedGameMode === "2-player") {
        enableBoxes();
        typeofgame.innerText = "2 - Player";
        typeofgame.classList.remove("hide");
    } else if (selectedGameMode === "vs-computer") {
        enableBoxes();
        if (turnO) {
            typeofgame.innerText = "VS-Computer, Computer's turn";
            computerMove(); //computer's turn if o
        } else {
            typeofgame.innerText = "VS-Computer, your turn";
        }
        typeofgame.classList.remove("hide");
    }
    
    isXStarting = !isXStarting; //alternate x and o
};


const computerMove = () => {
    let emptyBoxes = [];
    boxes.forEach((box, index) => {
        if (box.innerText === "") {
            emptyBoxes.push(index);
        }
    });

    if (emptyBoxes.length > 0) {
        let randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        let selectedBox = boxes[emptyBoxes[randomIndex]];

        if (turnO) {
            selectedBox.innerText = "O";
            turnO = false;
        } else {
            selectedBox.innerText = "X";
            turnO = true;
        }
        selectedBox.disabled = true;
        count++;

        let isWinner = checkWinner();
        if (!isWinner && count < 9) {
            typeofgame.innerText = "VS-Computer, your turn"; // Update message for player's turn
        }
    }

    if (count === 9 && !checkWinner()) {
        gameDraw();
    }
};

function showPopup() {
    document.getElementById('popup-window').style.display = 'block';
    document.getElementById('content-wrapper').classList.add('blur');
}

function hidePopup() {
    document.getElementById('popup-window').style.display = 'none';
    document.getElementById('content-wrapper').classList.remove('blur');
}

function getSelectedGameMode() {
    let gameModeOptions = document.querySelectorAll('input[name="game-mode"]');
    gameModeOptions.forEach(option => {
        if (option.checked) {
            selectedGameMode = option.value;
        }
    });
}
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

newGameButton.addEventListener('click', function() {
    showPopup();
});

continueButton.addEventListener('click', function() {
    getSelectedGameMode();
    startgame();
    hidePopup();
    console.log("Selected Game Mode:", selectedGameMode);
});

cancelButton.addEventListener('click', function() {
    hidePopup();
});

resetBtn.addEventListener("click", resetGame);