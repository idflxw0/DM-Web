// Quelques variables utiles
let nbTouches = 0; // initialisation du nombre de touches saisies par l'utilisateur
let vdef = "valeur du code saisi : "; // Chaîne d'affichage par défaut dans <input type="code">
let maxTentatives = 3; // réduction du nombre de soumissions à maxTentatives
let maxTouches = 6; // nombre de chiffres du code à saisir
let dimCarre = 4; // spécifie la dimension matricielle du clavier carré

// Queues références (jQuery) sur les balises de la page
let $allcases; // référence à toutes les balises <td> du clavier HTML (id="clavier")
let $activecases; // référence à celles qui ont class="activecase"
let $icode; // référence à la balise affichant le code saisi <input name="code">
let $form; // référence au formulaire <form action="" method="post">
let $msg; // référence à la zone de messages à l'utilisateur <div id="msg">

// Exécution par lancement de la fonction init.
init();

// Fonction d'initialisation
function init() {
    // Spécifier les valeurs des variables jQuery suivantes (voir ci-dessus les explications).
    $allcases = $("#clavier td");
    $activecases = $(".case.activecase");
    $icode = $("input[name='code']");
    $form = $("form");
    $msg = $("#msg");

    // Actions initiales à écrire :
    // ajouter vdef comme valeur initiale de <input name="code">
    $icode.val(vdef);

    // Autoriser les écoutes de clics sur le clavier pour lancer la fonction touche.
    $allcases.on("click", touche);

    // Autoriser la soumission du formulaire pour invoquer la fonction soumettre (clic sur bouton <input type="submit">)
    $form.on("submit", soumettre);

    // Autoriser l'effacement des données du formulaire pour invoquer effacerCode (clic sur bouton <input type="reset">)
    $("input[type='reset']").on("click", effacerCode);

    // Note pour le DST : l'initialisation du clavier est faite statiquement dans les cellules de <table>
    // donc, ne pas faire la fonction remplirClavierNum();
}

// Fonction pour gérer le clic sur une touche
function touche() {
    if (nbTouches < maxTouches) {
        // Récupérer la valeur de la touche cliquée
        const valeurTouche = $(this).text();

        // Ajouter la valeur de la touche à la valeur actuelle de l'input
        const codeSaisi = $icode.val();
        $icode.val(codeSaisi + valeurTouche);

        nbTouches++;
    }
}

// Fonction pour soumettre le formulaire
function soumettre(event) {
    event.preventDefault();

    // Vérifier s'il y a suffisamment de touches saisies et si le nombre de tentatives n'est pas dépassé
    if (nbTouches === maxTouches) {
        // Soumettre le formulaire ici (utiliser une requête jQuery AJAX)
        $.ajax({
            url: "loging-clavier.php",
            type: "POST",
            data: { nom: $("input[name='nom']").val(), code: $icode.val() },
            success: function (response) {
                if (response === "ok") {
                    $msg.text("Code valide.");
                } else {
                    $msg.text("Code invalide.");
                }
            },
            error: function () {
                $msg.text("Une erreur s'est produite.");
            },
        });

        // Réinitialiser le nombre de touches et effacer le code
        nbTouches = 0;
        effacerCode();
    } else {
        $msg.text("Veuillez saisir un code valide.");
    }
}

// Fonction pour effacer le code
function effacerCode() {
    $icode.val(vdef);
    nbTouches = 0;
}
