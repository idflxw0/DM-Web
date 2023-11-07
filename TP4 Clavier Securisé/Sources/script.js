// Quelques variables utiles
let nbTouches = 0; // initialisation du nombre de touches saisies par l'utilisateur
// let vdef = "valeur du code saisi : "; // Chaîne d'affichage par défaut dans <input type="code">
let maxTentatives = 3; // réduction du nombre de soumissions à maxTentatives
let maxTouches = 6; // nombre de chiffres du code à saisir
let dimCarre = 4; // spécifie la dimension matricielle du clavier carré

// Queues références (jQuery) sur les balises de la page
let allcases; // référence à toutes les balises <td> du clavier HTML (id="clavier")
let activecases; // référence à celles qui ont class="activecase"
let icode; // référence à la balise affichant le code saisi <input name="code">
let form; // référence au formulaire <form action="" method="post">
let msg; // référence à la zone de messages à l'utilisateur <div id="msg">

// Exécution par lancement de la fonction init.
init();

// Fonction d'initialisation
function init(){
    // Spécifier les valeurs des variables jQuery
    allcases = $("#clavier td");
    activecases = $("#clavier td.activecase");
    icode = $("input[name='code']");
    form = $("form");
    msg = $("#msg");

    // Set initial value for the code input
    icode.val(vdef);

    // Add event listeners
    activecases.click(touche);
    form.submit(soumettre);
    form.on("reset", effacerCode);
}

$(document).ready(init); // Launch the init function after DOM load


// Fonction pour gérer le clic sur une touche
function touche() {
    if (nbTouches < maxTouches) {
        let currentCode = icode.val();
        icode.val(currentCode + $(this).text());
        nbTouches++;
    }
}

// Fonction pour soumettre le formulaire
function soumettre(e) {
    e.preventDefault(); // Prevent form from submitting traditionally
    let totalSubmissions = form.data("submissions") || 0;

    if (nbTouches !== maxTouches || totalSubmissions >= maxTentatives) {
        msg.text("Erreur: Vérifiez le code ou le nombre de tentatives.");
        return;
    }

    // Prepare for AJAX call to "loging-clavier.php" (the actual AJAX call can be added in future lessons)
    let formData = {
        nom: $("input[name='nom']").val(),
        code: icode.val()
    };

    // Here, you would make an AJAX call and handle the response (ok or ko)
    // Reset the code input and update submission count
    effacerCode();
    form.data("submissions", totalSubmissions + 1);
}

$.ajax({
    type: "POST",
    url: "verifLogin.php",
    data: formData,
    success: function(response) {
        if(response.trim() === "ok") {
            msg.text("Success: Valid Code.");
            // Handle other tasks for successful login
        } else {
            msg.text("Error: Invalid Code.");
        }
    },
    error: function() {
        msg.text("Error: Problem with the request.");
    }
});

// Fonction pour effacer le code
function effacerCode() {
    icode.val(vdef);
    nbTouches = 0;
}

