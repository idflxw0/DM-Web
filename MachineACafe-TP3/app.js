import {injectElements, renewTag} from "./functions/dom.js";

const wrapper = document.querySelector('#controle')

const input = document.createElement("input");
input.style.float = "left";
input.placeholder = "Entrez la quantité de café (en tasses)";
wrapper.appendChild(input);

const calculateButton = document.createElement("button");
calculateButton.textContent = "Calculer";
wrapper.appendChild(calculateButton);

const inputWater = document.createElement("input");
inputWater.style.float = "left";
inputWater.placeholder = "Entrez l'eau disponible (en ml)";
wrapper.appendChild(inputWater);

const inputMilk = document.createElement("input");
inputMilk.style.float = "left";
inputMilk.placeholder = "Entrez le lait disponible (en ml)";
wrapper.appendChild(inputMilk);

const inputCoffeeBeans = document.createElement("input");
inputCoffeeBeans.style.float = "left";
inputCoffeeBeans.placeholder = "Entrez les grains de café disponibles (en g)";
wrapper.appendChild(inputCoffeeBeans);

const inputCups = document.createElement("input");
inputCups.style.float = "left";
inputCups.placeholder = "Entrez le nombre de tasses à café nécessaires";
wrapper.appendChild(inputCups);


const quantite_eau_par_tasse = 200;
const lait_par_tasse = 50;
const grains_cafe_par_tasse = 15;

let money = 550;  // Argent disponible
let water = 400; // Eau disponible en ml
let milk = 540;  // Lait disponible en ml
let coffeeBeans = 120; // Grains de café disponibles en g
let cups = 9;    // Tasses jetables disponibles

document.querySelector('#buy').addEventListener('click', buyCoffee);
document.querySelector('#fill').addEventListener('click', fillSupplies);
document.querySelector('#take').addEventListener('click', takeMoney);


function start() {
    if (input.value === "") {
        alert("quantite eau: "+ quantite_eau + "ml\n lait: " + lait +"ml\n grains cafe: " + grains_cafe);

    } else {
        const etapes = [
            {   Title : "Commence à faire le café",
                duree : 1000
            },
            {
                Title : "Mouds les grains de café",
                duree : 2000
            },
            {
                Title : "Fait chauffer l'eau",
                duree : 3000
            },
            {
                Title : "Infuse les grains de café moulus",
                duree : 4000
            },
            {
                Title : "Verse le café dans une tasse",
                duree : 5000
            },
            {
                Title : "Ajoute un peu de lait dans la tasse",
                duree : 6000
            },
            {
                Title : "Le café est terminé.",
                duree : 7000
            }
        ]
        const laListe = renewTag('ul');
        wrapper.append(laListe)
        injectElements(etapes, laListe)
    }

}

// const calculateIngredients = () => {
//     const userInput = input.value;
//     if (userInput === "") {
//         alert("Veuillez saisir la quantité de café.");
//     } else {
//         const quantityInCups = parseFloat(userInput);
//         const requiredWater = quantityInCups * quantite_eau_par_tasse;
//         const requiredMilk = quantityInCups * lait_par_tasse;
//         const requiredCoffeeBeans = quantityInCups * grains_cafe_par_tasse;
//
//         alert(`pour faire ${userInput} tasses de café, vous aurez besoin de :\n\n`
//             + `- ${requiredWater} ml d'eau\n`
//             + `- ${requiredMilk} ml du lait\n`
//             + `- ${requiredCoffeeBeans} g de grains de café`);
//     }
// }

const calculateIngredients = () => {
    // Récupérer les quantités d'ingrédients disponibles
    const userInputCups = parseFloat(inputCups.value);
    const userInputWater = parseFloat(inputWater.value);
    const userInputMilk = parseFloat(inputMilk.value);
    const userInputCoffeeBeans = parseFloat(inputCoffeeBeans.value);

    // Vérifier si les entrées sont des nombres valides
    if (isNaN(userInputCups) || isNaN(userInputWater) || isNaN(userInputMilk) || isNaN(userInputCoffeeBeans)) {
        alert("Veuillez entrer des valeurs numériques valides pour toutes les entrées.");
        return;
    }

    // Calculer les quantités d'ingrédients requises pour le nombre de tasses souhaité
    const requiredWater = userInputCups * quantite_eau_par_tasse;
    const requiredMilk = userInputCups * lait_par_tasse;
    const requiredCoffeeBeans = userInputCups * grains_cafe_par_tasse;

    // Vérifier si les quantités d'ingrédients disponibles sont suffisantes
    if (
        userInputWater >= requiredWater &&
        userInputMilk >= requiredMilk &&
        userInputCoffeeBeans >= requiredCoffeeBeans
    ) {
        const extraCups = Math.min(
            Math.floor(userInputWater / requiredWater),
            Math.floor(userInputMilk / requiredMilk),
            Math.floor(userInputCoffeeBeans / requiredCoffeeBeans)
        );

        if (extraCups > 0) {
            alert(`Oui, je peux faire cette quantité de café (et même ${extraCups} tasses de plus)`);
        } else {
            alert("Oui, je peux faire cette quantité de café");
        }
    } else {
        const maxCups = Math.min(
            Math.floor(userInputWater / quantite_eau_par_tasse),
            Math.floor(userInputMilk / lait_par_tasse),
            Math.floor(userInputCoffeeBeans / grains_cafe_par_tasse)
        );
        alert(`Non, je peux seulement faire ${maxCups} tasses de café`);
    }
}

const buyCoffee = () => {
    const coffeeType = prompt("Choisissez le type de café (expresso, latte, cappuccino):");
    let cost = 0;
    let requiredWater = 0;
    let requiredMilk = 0;
    let requiredCoffeeBeans = 0;

    switch (coffeeType.toLowerCase()) {
        case "expresso":
            cost = 4;
            requiredWater = 250;
            requiredCoffeeBeans = 16;
            break;
        case "latte":
            cost = 7;
            requiredWater = 350;
            requiredMilk = 75;
            requiredCoffeeBeans = 20;
            break;
        case "cappuccino":
            cost = 6;
            requiredWater = 200;
            requiredMilk = 100;
            requiredCoffeeBeans = 12;
            break;
        default:
            alert("Type de café invalide.");
            return;
    }

    if (water < requiredWater || milk < requiredMilk || coffeeBeans < requiredCoffeeBeans || cups < 1) {
        alert("Impossible de préparer le café. Fournitures insuffisantes.");
        return;
    }

    money += cost;
    water -= requiredWater;
    milk -= requiredMilk;
    coffeeBeans -= requiredCoffeeBeans;
    cups--;
    updateStatus();
}
const fillSupplies = () => {
    const fillWater = parseInt(prompt("Quantité d'eau à ajouter (en ml):"));
    const fillMilk = parseInt(prompt("Quantité de lait à ajouter (en ml):"));
    const fillCoffeeBeans = parseInt(prompt("Quantité de grains de café à ajouter (en g):"));
    const fillCups = parseInt(prompt("Nombre de tasses jetables à ajouter:"));

    if (isNaN(fillWater) || isNaN(fillMilk) || isNaN(fillCoffeeBeans) || isNaN(fillCups)) {
        alert("Veuillez entrer des valeurs numériques valides.");
        return;
    }

    water += fillWater;
    milk += fillMilk;
    coffeeBeans += fillCoffeeBeans;
    cups += fillCups;

    updateStatus();
}

const takeMoney = () => {
    alert(`Vous avez pris ${money} € de la machine à café.`);
    money = 0;
    updateStatus();
}

const updateStatus = () => {
    document.getElementById('money').textContent = `${money} €`;
    document.getElementById('water').textContent = `${water} ml`;
    document.getElementById('milk').textContent = `${milk} ml`;
    document.getElementById('coffeeBeans').textContent = `${coffeeBeans} g`;
    document.getElementById('cups').textContent = `${cups}`;
}
calculateButton.addEventListener('click', calculateIngredients);
document.querySelector('#start').addEventListener('click', start)