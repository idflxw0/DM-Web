let max_try = 6;
let try_count = 0;

const genRandom = () => {
    return Math.floor(Math.random() * 100) + 1;
}

let randNumber = genRandom();
const button = document.getElementById("valider");
let input = document.getElementById("input");

const textSup = "C'est plus";
const textInf = "C'est moin";
const notInt = "On a dit un nombre entier!!!";
let lost = "C'est perdu!, Le nombre Myst\xe8re \xe9tait ";
let textCorrect = "C'est gang\xe9, le nomber mystere \xe9tait bien ";

let showMessage = document.getElementById("message");
const resetGame = () => {
    button.textContent = "Rejouer?"
    randNumber = genRandom();
    console.log(randNumber);
    try_count = 0;
    lost  = "C'est perdu!, Le nombre Myst\xe8re \xe9tait " ;
    textCorrect = "C'est gang\xe9, le nomber mystere \xe9tait bien ";
}

const guess = () => {
    try_count++;
    const actual_Value = parseInt(input.value, 10);
    const current_count = "[" + try_count + "] ";
    button.textContent = "Essayer";
    destroyInnerText();

    if (actual_Value === randNumber) {
        showMessage.innerText = current_count + textCorrect + randNumber;
        changeColor("correct");
        resetGame();
    }
    else if (try_count === max_try) {
        showMessage.innerText = lost + randNumber;
        changeColor("lost");
        resetGame();
    } else if (actual_Value > randNumber) {
        showMessage.innerText = current_count + textSup;
        changeColor();
    } else if (actual_Value < randNumber) {
        showMessage.innerText = current_count + textInf;
        changeColor();
    } else {
        showMessage.innerText = current_count + notInt;
        changeColor("not integer");
    }
}

const destroyInnerText = () => {
    document.getElementById("message").innerText = '';
}

const changeColor = (current_state) => {
    switch (current_state) {
        case "correct":
            document.getElementById("message").style.color = "green";
            break;
        case "lost":
            document.getElementById("message").style.color = "red";
            break;
        case "not integer":
            document.getElementById("message").style.color = "default";
            break;
        default:
            document.getElementById("message").style.color = "blue";
            break;
    }
}

button.addEventListener("click", guess);
