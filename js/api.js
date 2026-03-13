import { URL, WORDS } from "./config.js";

export async function searchWords() {
  try {
    const response = await fetch(`${URL}/api/palavras.php?quantidade=6`);
    if (!response.ok) {
      throw new Error(`Error ${response.status}`);
    }
    const words = await response.json();
    console.log(words);
    return words;
  } catch (error) {
    console.log(error);
    return WORDS;
  }
}

export async function saveGame(gameData) {
  try {
    const response = await fetch(`${URL}/api/salvar.php`, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(gameData),
    });

    if (!response.ok) {
      throw new Error(`ERRO ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}
