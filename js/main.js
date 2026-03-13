import * as Theme from "./theme.js";
import { startGame } from "./game.js";

document.addEventListener("DOMContentLoaded", () => {
  const btnTheme = document.getElementById("btnTheme");
  btnTheme.onclick = Theme.changeTheme;

  const btnResetGame = document.getElementById("btnResetGame");
  btnResetGame.onclick = startGame;

  Theme.loadTheme();
  startGame();
});
