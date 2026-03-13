import { searchWords, saveGame } from "./api.js";
import { shuffle } from "./utils.js";

const CARDS = document.querySelectorAll(".card");
const ATTEMPTS = document.getElementById("attempts");
const TIMER = document.getElementById("timer");

let firstCardSelected = null;
let secondCardSelected = null;
let attempts = 0;
let isLocked = false;
let matches = 0;
let seconds;
let minutes;
let timerInterval;

export async function startGame() {
  resetAttempts();
  startTimer();
  matches = 0;

  let words = await searchWords();
  let shuffledCards = shuffle([...words, ...words]);

  CARDS.forEach((card, index) => {
    card.textContent = "?";
    card.classList.remove("matched");
    card.classList.remove("selected");
    card.dataset.palavra = shuffledCards[index];
    card.onclick = () => flipCard(card);
  });
}

function flipCard(card) {
  if (
    isLocked ||
    card === firstCardSelected ||
    (firstCardSelected && firstCardSelected.classList.contains("matched"))
  )
    return;

  card.textContent = card.dataset.palavra;
  card.classList.add("selected");

  if (!firstCardSelected) {
    firstCardSelected = card;
    return;
  }

  secondCardSelected = card;
  updateAttempts();
  compareCards();
}

function compareCards() {
  if (firstCardSelected.textContent == secondCardSelected.textContent) {
    firstCardSelected.classList.remove("selected");
    secondCardSelected.classList.remove("selected");
    firstCardSelected.classList.add("matched");
    secondCardSelected.classList.add("matched");
    firstCardSelected = null;
    secondCardSelected = null;
    matches++;

    checkGameEnd();
  } else {
    isLocked = true;
    setTimeout(() => {
      firstCardSelected.textContent = "?";
      secondCardSelected.textContent = "?";
      firstCardSelected.classList.remove("selected");
      secondCardSelected.classList.remove("selected");
      firstCardSelected = null;
      secondCardSelected = null;
      isLocked = false;
    }, 600);
  }
}

function updateAttempts() {
  attempts++;
  ATTEMPTS.textContent = attempts;
}

function resetAttempts() {
  ATTEMPTS.textContent = "0";
  attempts = 0;
}

function updateTimer() {
  seconds++;
  if (seconds === 60) {
    minutes++;
    seconds = 0;
  }

  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  TIMER.textContent = `${formattedMinutes}:${formattedSeconds}`;
}

function startTimer() {
  clearInterval(timerInterval);
  seconds = 0;
  minutes = 0;
  TIMER.textContent = "00:00";
  timerInterval = setInterval(updateTimer, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function checkGameEnd() {
  const ALLMATCHED = matches === CARDS.length / 2;
  if (ALLMATCHED) {
    stopTimer();
  }
}
