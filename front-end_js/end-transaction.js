//script de la page end-transaction.html

//Navigation - redirection du bouton précédent de l'index pour
//ne pas revenir sur cette page
if (localStorage.getItem("cart") == null) {
    window.location.replace("../index.html");
}

// Récupération des données générées sur la page précédente 
// et insérées comme paramètres de l'url
const urlString = window.location.search;
const urlStringParams = new URLSearchParams(urlString);
let idOrder = urlStringParams.get("key1");
let customerData = urlStringParams.get("key2");
let cartData = urlStringParams.get("key3");
let cartData2= urlStringParams.get("key4");

// Intégration dans le DOM des données
document.getElementById("thanksbox").innerHTML = 
        
    `<ul class="list-group list-group-flush">
        <li class="list-group-item list-group-item-success">Merci <strong>${customerData}</strong> pour la commande que vous venez d'effectuer.</li>
        <li class="list-group-item list-group-item-success">Nous lui avons attribué la référence suivante: <br><strong>${idOrder}</strong></li>
        <li class="list-group-item list-group-item-success">Elle comprend <strong>${cartData2} produits</strong></li>
        <li class="list-group-item list-group-item-success">Un règlement du montant du panier (<strong>${cartData}</strong>) vous sera demandé très prochainement</li>
    </ul>`;

/**supression du cart stocké dans le localStorage */
localStorage.clear("cart");

    