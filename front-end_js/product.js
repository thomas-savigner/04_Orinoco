// script de la page product.html

displayPreviewCart();

getAPIproduct();


/**method fetch avec urlProduct (id en paramètre) renvoie les données sur un produit choisi,
 * qu'on utilise faire une fiche produit détaillé
 * La method fetch intègre par défaut la gestion des promesses,
 * il n'est pas nécessaire d'attacher une nouvelle promesse
 */
function getAPIproduct() {
    
    fetch(urlProduct)
        .then(response => response.json())
        .then(data => {
            const product = data;
            displayCard(data);
            displayOptions(data);
            })
        .catch(error => alert("Erreur : " + error));
}
/** method qui permet de...  */
function displayCard(product) {
    let imageElement = document.getElementById("img-product");
    let nameElement = document.getElementById("name");
    let productPriceElement = document.getElementById("product-price");
    let descriptionElement = document.getElementById("description");
    
    imageElement.innerHTML = `<img id="image" src="${product.imageUrl}" class="img-fluid img-thumbnail image-properties"
                                alt="Appareil photo vintage ${product.name}">`;
    nameElement.innerHTML += `<h5 class="card-title">${product.name}</h5>`;
    productPriceElement.innerHTML += `${adaptPrice(product.price)}`;
    descriptionElement.innerHTML += `${product.description}`;
}

function displayOptions(product) {
    switch(shop) {
        case ("teddies"):
            document.getElementById("custom-option-name").innerHTML = "couleur";
            for (color of product.colors) {
                document.getElementById("options").innerHTML += 
                    `<option class="" value="${color}" name="lense">${color}</option>`;
            }
            break;
        case ("cameras"):
            document.getElementById("custom-option-name").innerHTML = "lentille";
            for (lense of product.lenses) {
                document.getElementById("options").innerHTML += 
                    `<option class="" value="${lense}" name="lense">${lense}</option>`;
            }
            break;
        case ("furniture"):
            document.getElementById("custom-option-name").innerHTML = "vernis";
            for (type of product.varnish) {
                document.getElementById("options").innerHTML += 
                    `<option class="" value="${type}" name="lense">${type}</option>`;
            }
            break;
        default:
            alert("la valeur de la constante shop est erronée sur le script chooseShop.js ");
    }
}

iconCart()

/*Module Quantité*/

let quantityNumber = 1;

//Affichage de la valeur quantité
displayQuantity();

function displayQuantity() {
    const containerQuantity = document.getElementById("quantity-product");
    containerQuantity.innerHTML = quantityNumber;
    };

//Ajuster la quantité

    //Paramétrage bouton "-"
    const lessQuantityBtn = document.getElementById("decrement-button");
    
    lessQuantityBtn.addEventListener("click", function() {
        quantityNumber--;

        if (quantityNumber < 1) {
            quantityNumber = 1
        }
        displayQuantity();
    });

    //Paramétrage bouton "+"
    const addQuantityBtn = document.getElementById("increment-button");

    addQuantityBtn.addEventListener("click", function() {
        quantityNumber++;
        displayQuantity();
    });


/* Bouton ajouter au panier        */
const addCartElement = document.getElementById("addtocart-button");

addCartElement.addEventListener("click", function() {
    
    // on récupère le prix affiché comme valeur de variable string au format monétaire
    // on change le type de string à number
    let priceElement = document.getElementById("product-price").textContent;
    let priceStore = parseFloat(priceElement.replace('€', '').replace(/\s/g,''));

    let itemCart = {
        nameProduct : document.getElementById("name").textContent,
        quantityProduct : quantityNumber,
        priceProduct : priceStore,
        imageProduct : document.getElementById("image").src,
        urlProduct : idUrl,
    };

    let cartContentEmpty = [];
    
    let cartContentFull = JSON.parse(localStorage.getItem("cart"));
    
    if (localStorage.getItem("cart") !== null 
        && 
        cartContentFull.find(cart => cart.nameProduct === itemCart.nameProduct) !== undefined) {
            let indexItem = cartContentFull.indexOf(cartContentFull.find( cart => cart.nameProduct === itemCart.nameProduct));
            let quantityContent = cartContentFull[indexItem].quantityProduct;
            let quantityAdjusted = quantityContent + itemCart.quantityProduct;
            
            cartContentFull[indexItem].quantityProduct = quantityAdjusted;

            let objLinea = JSON.stringify(cartContentFull);
            localStorage.setItem("cart", objLinea);
            displayPreviewCart();
        } else if (localStorage.getItem("cart") !== null 
                    && 
                    cartContentFull.find(cart => cart.nameProduct === itemCart.nameProduct) == undefined) {
            cartContentFull.push(itemCart);
            let objLinea = JSON.stringify(cartContentFull);
            localStorage.setItem("cart", objLinea);
            displayPreviewCart();
        } else {
            cartContentEmpty.push(itemCart);
            let objLinea = JSON.stringify(cartContentEmpty);
            localStorage.setItem("cart", objLinea);
            iconCart();
            displayPreviewCart();
            ColorOrderButton()
        }
    quantityNumber = 1;
    displayQuantity();
    });


/* Bouton "Commander": Accéder à la page order */
ColorOrderButton();

let orderButtonElement = document.getElementById("access-order-page");

orderButtonElement.addEventListener('click', function(event) {
    if (localStorage.getItem("cart") == null) {
        event.preventDefault()
    }
})

function ColorOrderButton() {
    if (localStorage.getItem("cart") !== null) {
        document.getElementById("access-order-page").classList.remove("btn-light", "text-secondary");
        document.getElementById("access-order-page").classList.add("btn-success", "text-light");
    }
}

function defaultColorOrderButton() {
    document.getElementById("access-order-page").classList.remove("btn-success", "text-light");
    document.getElementById("access-order-page").classList.add("btn-light", "text-secondary");
    
}
