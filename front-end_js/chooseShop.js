// Choix du magasin
// Cette constante peut prendre aujourd'hui 3 valeurs ("furniture", "teddies", "cameras"),
// On choisit ici cette valeur

const shop = "cameras";


// adaptation du logo et marque du header sur toutes les pages 
// en fonction des valeurs de shop:

switch(shop) {
    case ("teddies"):
        document.getElementById("brandshop").innerHTML = 
        ` <span class="material-icons align-top">pets</span>&emsp;OriNounours `;
        
        break;
    case ("cameras"):
        document.getElementById("brandshop").innerHTML = 
        ` <span class="material-icons align-bottom">photo_camera</span>&emsp;OriPhoto `;
        
        break;
    case ("furniture"):
        document.getElementById("brandshop").innerHTML = 
        ` <span class="material-icons align-top">cabin</span>&emsp;OriMeuble `;
        
        break;
    default:
        alert("la valeur de la constante shop est erronée sur le script chooseShops.js ");
}




