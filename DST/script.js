// Choix de la partie: 0:Pierre 1:Feuille 2:Ciseaux
const choix = [
    {img:"pierre", ctre:"feuille", rpse:"La pierre gagne car elle broie les ciseaux."},
    {img:"feuille", ctre:"ciseaux", rpse:"La feuille bat la pierre en l'enveloppant."},
    {img:"ciseaux", ctre:"pierre", rpse:"Les ciseaux l'emportent face à la feuille qu'ils coupent."}
];

const nbChoix = choix.length;

const info = { //ensemble des messages informatifs de situation
    "choix": "Faites votre choix en cliquant sur une image",
    "jouer": "cliquez sur jouer ou annuler",
    "gagne": "Victoire humaine !!",
    "perd": "Victoire informatique !!",
    "execo": "Egalité. Pas de point accordé. On rejoue !",
    "partie": "Nouvelle partie pour la manche ?",
    "rejouer": "Rejouer une manche ?",
    "score": "Score pour la manche en cours : ",
    "manche": "Nombre de manches gagnées : "
};
let imgList; //tableau : collection de références aux objets
let refMessage; //réf: affichage des infos (div avec id=message)
let refScore; //réf: affichage du score pour la manche en cours (div avec id=score)
let refManche; //réf: affichage du nb de manches gagnées (div avec id=manche)
let btnJouer; //réf: btn pour lancer le choix de l'ordinateur (div avec id=jouer)
let btnAnnuler; //réf: btn pour annuler la manche en cours (div avec id=annuler)
let btnRejouer; //réf: btn pour rejouer une nouvelle manche
let btnSauver; //réf: btn pour lancer l'enregistrement des manches nouvellement gagnées.

let caseJoueur; //réf: affichage de l'image choisie par le joueur
let caseOrdi; //réf: affichage de l'image choisie par l'ordinateur

let choixJoueur; //indice du choix d'une image du joueur: soit 0 1 ou 2
let choixOrdi; //indice du choix d'une image pour l'ordinateur: soit 0 1 ou 2

let scoreJoueur=0; //nb parties gagnées par le joueur dans la manche en cours
let scoreOrdi=0; //nb parties gagnées par l'ordinateur pour la manche en cours
let vain=0; //nb manches gagnées par le joueur humain
let vmanche=0; //nb manches jouées au total
let gagnant; //index du gagnant d'une partie

// A FAIRE >>
// Démarrer le jeu, sachant que init est la première fonction à lancer
$(document).ready(init);

// NE PAS FAIRE
function init() { // Initialisation dynamique de références et boutons cliquables
    refMessage = document.getElementById("message");
    refScore = document.getElementById("score");
    refManche = document.getElementById("manche");
    refCaseJoueur = document.getElementById("humain");
    refCaseOrdi = document.getElementById("ordinateur");

    initButtons();
    imgList();
    etape1();
}
// A FAIRE >> Initialisation des boutons (se concentrer sur un d'eux à titre d'exemple)
function initButtons() {
    // Les boutons seront affichés ou masqués à l'affichage
    // dynamiquement au besoin dans les étapes du jeu.
    // mais ils sont initialisés pour lancer une fonction et masqués à l'affichage :
    // un clic sur le btn jouer lance etape3()
    // un clic sur le btn annuler lance etape1() (à partir de l'étape 2)
    // un clic sur le btn rejouer lance etape1() (à partir de l'étape 3)
    // un clic sur le btn sauver lance sauverManches()
    btnJouer = $("#jouer");
    btnAnnuler = $("#annuler");
    btnRejouer = $("#rejouer");
    btnSauver = $("#sauverManches");
    btnJouer.css('display','none');
    btnJouer.click(etape3);
    btnAnnuler.click(etape1);
    btnRejouer.click(etape1);
    btnSauver.click(sauverManches);
}

// A FAIRE >> 3 fonctions de gestion des images
function imgList() {
    // rendre cliquable les images <img> du jeu, sachant que ces images
    // sont des balises <img> qui se trouvent dans des div avec id="images" et class="image"
    // il faut leur associer l'écoute de l'évènement onclick
    imgList = $(".choix .image");
    imgList.click(() => {
        choixJoueur = this.id;
        etape2();
    });
}
function montreImg(){//affichage a l'ecran des images cliquables
    imgList.css('display','inline');
}
function cacherImg() {
    //Masque des images cliquables
    imgList.css('display','none');
}

// A FAIRE:
function etape1(){
    // Masquage des boutons.
    // Affichage des images cliquables au Joueur humain
    // Un clic sur une des images est compris comme la sélection de
    // l'image par le joueur humain et permet de passer à l'étape2.
    // Affichage des informations du jeu :
    // -message de situation (il faut sélectionner une image ...)
    // -valeur de scores comparés et de manches nouvellement gagnées.
    btnJouer.hide();
    btnSauver.hide();
    btnRejouer.hide();
    btnAnnuler.hide();
    montreImg();
    refMessage.html(info['choix']);
    refScore.html(info['score'] + ": " + scoreJoueur)
    refManche.html(info['manche'] + ": " + vmanche);
}

// A FAIRE:
function etape2(){
    // Afficher l'image choisie par l'humain dans la case
    // référencée refCaseJoueur
    // Et cacher les images ayant permis le choix dans l'étape 1.
    // Gérer les boutons de jeu : (affichage et masquage)
    // Le bouton Jouer doit permettre de lancer l'étape 3.
    // Le bouton Annuler doit permettre revenir à l'étape 1.
    // Affichage d'un message de situation (il faut jouer ou annuler)
    caseJoueur.src = imgList[choixJoueur].attr('src');
    cacherImg();
    btnJouer.css('display','inline');
    btnAnnuler.css('display','inline');
    btnRejouer.css('display','inline');
    btnJouer.css('display','inline');
    refMessage.html(info['jouer']);
}


function etape3(){
    // Définition aléatoire de l'indice d'une image pour l'ordi
    // (exploiter la fonction tirage).
    // Affichage de l'image dans la case référencée refCaseOrdi
    // Évaluer le gagnant de la partie et mise à jour des manches
    // gagnées et de manches réalisées (variables vgain et vmanche)
    // Afficher les scores comparés et manches gagnées
    // Affichage d'un message de situation (gagnant ....)
    // Gestion des boutons de jeu : (affichage et masquage)
    // Le bouton Rejouer doit permettre le retour à l'étape 1
    // Le bouton Sauver doit permettre la sauvegarde
    choixOrdi = tirage();
    caseOrdi.src = imgList[choixOrdi].attr("src");
    if (choixOrdi === choixJoueur) gagnant = null;
    //Pierre vs Feuille
    else if (choixJoueur === 1 && choixOrdi === 2) gagnant= 'o';
    else if (choixJoueur === 2 && choixOrdi === 1) gagnant = 'j';
    //Feuille vs ciseaux
    else if (choixJoueur === 2 && choixOrdi === 3) gagnant = 'o';
    else if (choixJoueur === 3 && choixOrdi === 2) gagnant = 'j';
    //ciseaux vs Pierre
    else if (choixJoueur === 1 && choixOrdi === 3) gagnant = 'j';
    else if (choixJoueur === 3 && choixOrdi === 1) gagnant = 'o';

}


function tirage() { return Math.floor(Math.random() * nbChoix); }

// NE PAS FAIRE :

// A FAIRE pour la question 2 :
function sauverManches(){
    // fonction AJAX destinée à
    // sauver le nombre de manches nouvellement jouées et
    // réinitialiser à 0 ce nombre pour l'affichage.
    // - le protocole http sera exécuté en méthode post
    // - le script s'appelle PFC_sauverManches.php
    // - le champs appid du formulaire <form id="sauver"> est un
    //   paramètre de la requête destinée à
    // - les 2 autres paramètres étant les valeurs de manches gagnées
    //   et de manches réalisées (vgain et vmanche).

}


