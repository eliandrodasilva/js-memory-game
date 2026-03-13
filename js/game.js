import { searchWords, saveGame } from "./api.js";
import { shuffle } from "./utils.js";

const CARDS = document.querySelectorAll(".card");

let firstCardSelected = null;
let secondCardSelected = null;
let attempts = 0;
let isLocked = false;

export async function startGame() {
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
  if (isLocked || card === firstCardSelected) return;

  card.textContent = card.dataset.palavra;
  card.classList.add("selected");

  if (!firstCardSelected) {
    firstCardSelected = card;
    return;
  }

  secondCardSelected = card;
  attempts++;
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
