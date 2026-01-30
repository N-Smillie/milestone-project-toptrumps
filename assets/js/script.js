// Array of card objects
const cardPool = [
{   image: "assets/images/demon.jpg",
    title: "Demon",
    attack: 66,
    defence: 31,
    speed: 47,
},
{   image: "assets/images/dinosaur.jpg",
    title: "Dinosaur",
    attack: 22,
    defence: 91,
    speed: 18,
},
{   image: "assets/images/dragon.jpg",
    title: "Dragon",
    attack: 88,
    defence: 55,
    speed: 38,
},
{   image: "assets/images/elelmental.jpg",
    title: "Elemental",
    attack: 74,
    defence: 20,
    speed: 64,
},
{   image: "assets/images/frog.jpg",
    title: "Frog",
    attack: 31,
    defence: 37,
    speed: 68,
},
{   image: "assets/images/ghost.jpg",
    title: "Ghost",
    attack: 68,
    defence: 22,
    speed: 59,
},
{   image: "assets/images/goblin.jpg",
    title: "Goblin",
    attack: 69,
    defence: 21,
    speed: 41,
},
{   image: "assets/images/human.jpg",
    title: "Human",
    attack: 47,
    defence: 42,
    speed: 44,
},
{   image: "assets/images/kraken.jpg",
    title: "Kraken",
    attack: 80,
    defence: 60,
    speed: 20,
},
{   image: "assets/images/mage.jpg",
    title: "Mage",
    attack: 55,
    defence: 33,
    speed: 62,
},
{   image: "assets/images/monster.jpg",
    title: "Monster",
    attack: 23,
    defence: 78,
    speed: 24,
},
{   image: "assets/images/mummy.jpg",
    title: "Mummy",
    attack: 39,
    defence: 55,
    speed: 29,
},
{   image: "assets/images/ogre.jpg",
    title: "Ogre",
    attack: 79,
    defence: 85,
    speed: 21,
},
{   image: "assets/images/phoenix.jpg",
    title: "Phoenix",
    attack: 27,
    defence: 23,
    speed: 88,
},
{   image: "assets/images/pirate.jpg",
    title: "Pirate",
    attack: 62,
    defence: 44,
    speed: 34,
},
{   image: "assets/images/robot.jpg",
    title: "Robot",
    attack: 75,
    defence: 84,
    speed: 11,
},
{   image: "assets/images/serpent.jpg",
    title: "Serpent",
    attack: 77,
    defence: 45,
    speed: 36,
},
{   image: "assets/images/tiger.jpg",
    title: "Tiger",
    attack: 67,
    defence: 28,
    speed: 77,
},
{   image: "assets/images/werewolf.jpg",
    title: "Werewolf",
    attack: 71,
    defence: 41,
    speed: 53,
},
{   image: "assets/images/witch.jpg",
    title: "Witch",
    attack: 61,
    defence: 43,
    speed: 39,
},
]

// Wait for the DOM to finish loading before running the game
document.addEventListener("DOMContentLoaded", () => {

// Buttons
const newGameBtn = document.getElementById("new-game-btn");
const nextTurnBtn = document.getElementById("next-turn-btn");

// Player Card
const playerImg = document.getElementById("player-card-img");
const playerTitle = document.getElementById("player-title");
const playerAttack = document.getElementById("player-attack");
const playerDefence = document.getElementById("player-defence");
const playerSpeed = document.getElementById("player-speed");
const playerScoreSpan = document.getElementById("player-score");
const playerAttackLi = document.getElementById("player-attack-li");
const playerDefenceLi = document.getElementById("player-defence-li");
const playerSpeedLi = document.getElementById("player-speed-li");

// CPU Card
const cpuImg = document.getElementById("cpu-card-img");
const cpuTitle = document.getElementById("cpu-title");
const cpuAttack = document.getElementById("cpu-attack");
const cpuDefence = document.getElementById("cpu-defence");
const cpuSpeed = document.getElementById("cpu-speed");
const cpuScoreSpan = document.getElementById("cpu-score");
const cpuCardBody = document.getElementById("cpu-card-body");

// Remove revealed class from cards at start
document.querySelector('.player-card').classList.remove('revealed');
document.querySelector('.cpu-card').classList.remove('revealed');


// Modal
const modalEl = document.getElementById('game-result-modal');
const gameResultModal = new bootstrap.Modal(modalEl);

// Restart game when modal is closed
modalEl.addEventListener('hidden.bs.modal', () => {
        newGame();
    });


// Game state
let playerDeck = [];
let cpuDeck = [];
let playerScore = 0;
let cpuScore = 0;
let currentPlayerCard = null;
let currentCpuCard = null;
let playerCanTakeTurn = true;


// Function to shuffle the deck using Fisher-Yates shuffle
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[randomIndex]] = [deck[randomIndex], deck[i]];
    }
}

// Creating deck for player and CPU
function createDecks(cardPool) {
    const deck = [...cardPool];
    shuffleDeck(deck);
    const half = deck.length / 2;
    const playerDeck = deck.slice(0, half);
    const cpuDeck = deck.slice(half);
    return {playerDeck, cpuDeck};
}

const decks = createDecks(cardPool);
playerDeck = decks.playerDeck;
cpuDeck = decks.cpuDeck;


// New Game Function
function newGame() {
    document.querySelector('.player-card').classList.remove('revealed');
    document.querySelector('.cpu-card').classList.remove('revealed');

    playerScore = 0;
    cpuScore = 0;
    playerScoreSpan.textContent = playerScore;
    cpuScoreSpan.textContent = cpuScore;

    // Reset game state
    playerCanTakeTurn = true;
    nextTurnBtn.disabled = false;
    nextTurnBtn.classList.add('hidden');

    // Remove win/lose classes from previous game
    document.querySelectorAll('.player-card li, .cpu-card li')
        .forEach(li => li.classList.remove('win', 'lose'));

    const decks = createDecks(cardPool);
    playerDeck = decks.playerDeck;
    cpuDeck = decks.cpuDeck;

    drawCards();

    hideCpuCard();
}

// Draw initial cards function
function drawInitialCards() {
    if (playerDeck.length === 0 || cpuDeck.length === 0) {
        drawCards();
    }
}

// Show Player card function
function showPlayerCard() {
    document.querySelector('.player-card').classList.add('revealed');

    playerImg.src = currentPlayerCard.image;
    playerTitle.textContent = currentPlayerCard.title;
    playerAttack.textContent = currentPlayerCard.attack;
    playerDefence.textContent = currentPlayerCard.defence;
    playerSpeed.textContent = currentPlayerCard.speed;
}

// Hide CPU card function
function hideCpuCard() {
    cpuImg.classList.add("hidden");
    cpuCardBody.classList.add("hidden");
}

// Show CPU card function
function showCpuCard() {
    document.querySelector('.cpu-card').classList.add('revealed');

    cpuImg.src = currentCpuCard.image;
    cpuTitle.textContent = currentCpuCard.title;
    cpuAttack.textContent = currentCpuCard.attack;
    cpuDefence.textContent = currentCpuCard.defence;
    cpuSpeed.textContent = currentCpuCard.speed;

    // Reveal CPU card attributes
    cpuImg.classList.remove("hidden");
    cpuCardBody.classList.remove("hidden");
}

// Attribute selection and comparison function
function selectAttribute(attribute) {
    showCpuCard();
    const playerValue = currentPlayerCard[attribute];
    const cpuValue = currentCpuCard[attribute];

    const playerLi = document.querySelector(`.player-card .${attribute}`);
    const cpuLi = document.querySelector(`.cpu-card .${attribute}`);

    if (playerValue > cpuValue) {
        playerScore++;
        playerScoreSpan.textContent = playerScore;
        playerLi.classList.add("win");
        cpuLi.classList.add("lose");
    } else if (cpuValue > playerValue) {
        cpuScore++;
        cpuScoreSpan.textContent = cpuScore;
        playerLi.classList.add("lose");
        cpuLi.classList.add("win");
    }
    checkForWinner();
}

// Draw Cards function
function drawCards () {
    currentPlayerCard = playerDeck.pop();
    currentCpuCard = cpuDeck.pop();
    
    showPlayerCard();
    hideCpuCard();
}

// Next Turn Function
function nextTurn() {
    document.querySelector('.player-card').classList.remove('revealed');
    document.querySelector('.cpu-card').classList.remove('revealed');
    drawCards();
    playerCanTakeTurn = true;
    nextTurnBtn.classList.add('hidden');

    // Remove win/lose classes from previous round
    document.querySelectorAll('.player-card li, .cpu-card li')
        .forEach(li => li.classList.remove('win', 'lose'));
}

// Check for winner function
function checkForWinner() {

    if (playerScore >= 5) {
        endGame();
    }
    else if (cpuScore >= 5) {
        endGame();
}
}

// End Game function
function endGame() {
    const modalTitle = document.getElementById('game-result-title');
    const modalMessage = document.getElementById('game-result-message');

    if (playerScore > cpuScore) {
        modalTitle.textContent = "You Win!";
        modalMessage.textContent = "Congratulations, you won the game!";
    }
    else if (cpuScore > playerScore) {
        modalTitle.textContent = "CPU Wins!";
        modalMessage.textContent = "Sorry, you lost the game.";
    }
    playerCanTakeTurn = false;
    nextTurnBtn.disabled = true;

    gameResultModal.show()
}

// Event Listeners
newGameBtn.addEventListener("click", newGame);
nextTurnBtn.addEventListener("click", nextTurn);
playerAttackLi.addEventListener("click", () => {
	if (playerCanTakeTurn) {
        selectAttribute("attack");
        playerCanTakeTurn = false;
        nextTurnBtn.classList.remove('hidden');
    }
});
playerDefenceLi.addEventListener("click", () => {
	if (playerCanTakeTurn) {
        selectAttribute("defence");
        playerCanTakeTurn = false;
        nextTurnBtn.classList.remove('hidden');
    }
});
playerSpeedLi.addEventListener("click", () => {
	if (playerCanTakeTurn) {
        selectAttribute("speed");
        playerCanTakeTurn = false;
        nextTurnBtn.classList.remove('hidden');
    }
});

}); // End of DOMContentLoaded event listener