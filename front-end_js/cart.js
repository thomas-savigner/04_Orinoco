// Fonctions pour la gestion du Panier


//  Indication header icone "panier vide / panier rempli" 
//  fonction utilisée en page index et product
function iconCart() {
    const iconCartEmptyElement = document.getElementById("empty-icon");
    const iconCartFullElement = document.getElementById("full-icon");
    const displayEmptyCart = iconCartEmptyElement.classList;
    const displayFullCart = iconCartFullElement.classList;

    if (localStorage.getItem("cart") !== null){
    displayEmptyCart.add("d-none");
    displayFullCart.remove("d-none");
    } else {
        displayEmptyCart.remove("d-none");
        displayFullCart.add("d-none");
    }
}

//  Format des prix
//  fonction utilisée en page index et product pour l'affichage
function adaptPrice(priceNumber) {
    let price = Intl.NumberFormat("fr-FR", {
            style: "currency",
            currency: "EUR",
            minimumFractionDigits: 2,
        }).format(`${priceNumber}` / 100);
        return price;
    }
//fonction utilisée en page order pour l'affichage
function loadPrice(priceNumber) {
    let price = Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: "EUR",
        minimumFractionDigits: 2,
    }).format(`${priceNumber}`);
    return price;
} 

//  Preview Panier page product
//  Affichage synthétique (lien-photo avec pastille "quantité")
function displayPreviewCart() {
    
    const cartElement = document.getElementById("cart");

    if (localStorage.getItem("cart") !== null) {

        document.getElementById("nopreview").classList.remove("d-md-block");
        document.getElementById("preview").classList.add("d-md-block");

        const cartContentFull = JSON.parse(localStorage.getItem("cart"));

        let cartProduct = [];
        
        for (let i =0; i < cartContentFull.length; i++) {
    
            cartProduct[i]=
                            `
                            <a href="product.html?_id=${cartContentFull[i].urlProduct}" class="link-cart-item" title="Revoir le ${cartContentFull[i].nameProduct}">
                            <div class="d-flex flex-column align-items-center">
                                <div>
                                    <div class="quantity-selected">${cartContentFull[i].quantityProduct}</div>
                                </div>
                                <img src="${cartContentFull[i].imageProduct}" class="image-cover border"/>
                            </div>
                            </a>
                            
                            `
                            ;
        };

        let concatCartArray = cartProduct.join("");
        
        cartElement.innerHTML = concatCartArray;

        /* Bouton "vider le panier" */
        
        let clearCartButton =    `
                                <div class="d-flex justify-content-center my-4">
                                    <button id="clearcart" class="btn btn-sm btn-warning border border-dark border-3 hover-shadow" title="Vider votre panier">
                                        <span class="material-icons text-dark clearcartbutton">
                                            remove_shopping_cart
                                        </span>
                                    </button>
                                </div>
                                `
                      
        document.getElementById("clear-out-button").innerHTML = clearCartButton;

        let clearButtonElement = document.getElementById("clearcart");

        clearButtonElement.addEventListener("click", function() {
            localStorage.removeItem("cart");
            iconCart();
            displayPreviewCart();
            defaultColorOrderButton()
        });
    
    } else {
        document.getElementById("nopreview").classList.add("d-md-block");
        document.getElementById("preview").classList.remove("d-md-block");
    }
}


//  instructions pour calculer le total du panier en page order 
function arithmetic() {
    sumProductLine = [];
 
  //  Calcul total chaque ligne
    for (let i=0; i < cartContent.length; i++) {
        sumProductLine[i] = (cartContent[i].priceProduct)*(cartContent[i].quantityProduct);
    }
        
    //  Total des lignes
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    cartTotal = sumProductLine.reduce(reducer);
}

