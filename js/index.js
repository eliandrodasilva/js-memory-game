const url = "https://darkblue-frog-779608.hostingersite.com";
const btnReset = document.getElementById("btnReset");
const cards = document.querySelectorAll(".card");

let palavras = ["js", "css", "dev", "web", "html", "code"];
let primeira = null;
let segunda = null;
let tentativas = 0;

btnReset.onclick = () => buscarPalavras();

console.log(cards);
// iniciar();

buscarPalavras();
// salvarPartida()

async function buscarPalavras() {
    try {
        const response = await fetch(`${url}/api/palavras.php?quantidade=6`);
        if (!response.ok) {
            throw new Error(`Error ${response.status}`);
        }
        palavras = await response.json();
        console.log(palavras);
        iniciar();
    } catch (error) {
        console.log(error);
    }
}

async function salvarPartida() {
    try {
        const response = await fetch(`${url}/api/salvar.php`, {
            method: 'POST',
            header: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nome: "Antedeguemom", tempo: 3.6, tentativas: 1 })
        })

        if (!response.ok) {
            throw new Error(`ERRO ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
}


function iniciar() {
    let embaralhadas = embaralhar([...palavras, ...palavras]);
    cards.forEach((card, index) => {
        card.textContent = "?";
        card.classList.remove("acertou");
        card.classList.remove("selecionado");
        card.dataset.palavra = embaralhadas[index];
        card.onclick = () => virar(card);
    });
}

function virar(card) {
    card.textContent = card.dataset.palavra;
    card.classList.add("selecionado");
    if (!primeira) {
        primeira = card;
        return;
    }
    segunda = card;
    tentativas++;
    verificar();
}

function verificar() {
    if (primeira.textContent == segunda.textContent) {
        primeira.classList.remove("selecionado");
        segunda.classList.remove("selecionado");
        primeira.classList.add("acertou");
        segunda.classList.add("acertou");
        primeira = null;
        segunda = null;
        console.log("Acertou!");
    } else {
        console.log("Errou!");
        setTimeout(() => {
            primeira.textContent = "?";
            segunda.textContent = "?";
            primeira.classList.remove("selecionado");
            segunda.classList.remove("selecionado");
            primeira = null;
            segunda = null;
        }, 600);
    }
}

function embaralhar(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}