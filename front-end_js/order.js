//script de la page order.html

// Navigation - cette page ne sera pas accessible tant que l'utilisateur n'a pas choisi un produit
if (localStorage.getItem("cart") == null) {
    window.location.replace("../index.html");
}

//  Array "contenu Panier" sur localStorage
let cartContent = JSON.parse(localStorage.getItem("cart"));


// Calcul du montant du panier
    arithmetic();

// Chargement du panier
    // Création du contenu HTML avec les données de chaque produit du panier
    const itemsCart = [];

    for (let i=0; i < cartContent.length; i++) {
        itemsCart[i] =   `
                        <div id="lineproduct${i}"class="col-12 d-flex justify-content-between align-items-center mt-3">
                            <a href="product.html?_id=${cartContent[i].urlProduct}" title="Retourner sur la fiche du ${cartContent[i].nameProduct}" class="d-flex justify-content-between align-items-center w-50 text-decoration-none text-dark">
                                <div id="imageitem${i}" class="w-50"><img id="img${i}"" src="${cartContent[i].imageProduct}" alt="Appareil photo vintage ${cartContent[i].nameProduct}" class="cart-order-img"/></div>
                                <div id="nameitem${i}" class="w-50 mx-3">${cartContent[i].nameProduct}</div>
                            </a>
                            <div id="priceitem${i}" class="w-25 text-center">${loadPrice(cartContent[i].priceProduct)}</div>
                            <div class="d-flex w-25 justify-content-center">
                                <button id="decrement-button${i}" type="button" class="btn btn-success btn-sm border border-muted border-3 hover-shadow shadow" title="diminuer la quantité">-</button>
                                <span id="quantity-product${i}" class="align-middle m-1 p-1 border border-2 w-25 text-center">${cartContent[i].quantityProduct}</span>
                                <button id="increment-button${i}" type="button" class="btn btn-success btn-sm border border-muted border-3 hover-shadow shadow" title="augmenter la quantité">+</button>
                            </div>
                            <div id="totalproduct${i}" class="w-25 text-end mx-3">${loadPrice(sumProductLine[i])}</div>
                            <button id="deleteitem${i}" type="button" class="btn btn-warning btn-sm border border-dark border-3 hover-shadow shadow"><span class="material-icons">delete_forever</span></button>
                        </div>
                        ` 
    }

    // Injection du contenu dans le DOM
    let concatItemsCart = itemsCart.join("");

    const cartContentElement = document.getElementById("cartlistproducts");
    cartContentElement.innerHTML = concatItemsCart;

    document.getElementById("sumcolumn").innerHTML = loadPrice(cartTotal);


// Modification Panier
    /* On créé un tableau de référence du panier sur laquelle on se base pour 
       les liaisons élément / eventListener après suppression d'une ligne du panier */
    let tempCart =[];

    //Pose des écouteurs click-button pour modifier quantitéProduct enregistrée
    for (i=0; i < cartContent.length; i++) {

        // On reprend la structure de l'objet panier stocké en localStorage et dont on va modifier la quantité
        // Modélisation
        let itemCart = {
            nameProduct : document.getElementById("nameitem"+i).innerHTML,
            quantityProduct : Number(document.getElementById("quantity-product"+i).innerHTML),
            priceProduct : cartContent[i].priceProduct,
            imageProduct : document.getElementById("img"+i).src,
            urlProduct : cartContent[i].urlProduct,
        };

        
        tempCart[i] = itemCart;
        
        //Paramétrage bouton "-"
        const lessQuantityBtn = document.getElementById("decrement-button"+ i);
        
        let quantityStored = itemCart.quantityProduct;

        lessQuantityBtn.addEventListener('click', function() {
            
            quantityStored--;
                
            if (quantityStored < 1) { quantityStored = 1 }

            // On met le panier à jour en cherchant d'abord l'index de la ligne du produit dans le panier
            let indexItem = cartContent.indexOf(cartContent.find( cart => cart.nameProduct === itemCart.nameProduct));
            
            // On affecte à la ligne correspondante la quantité modifiée
            cartContent[indexItem].quantityProduct = quantityStored;

            // On renvoit le panier mis à jour
            let objLinea = JSON.stringify(cartContent);
            localStorage.setItem("cart", objLinea);            
            
            // On ventile les données modifiées dans le DOM
            
                arithmetic();

                // On cherche la ligne correspondante dans le tableau de référence pour modifier le bon élément du DOM
                let tempIndex = tempCart.indexOf(tempCart.find( cart => cart.nameProduct === itemCart.nameProduct));

                document.getElementById("quantity-product"+tempIndex).innerHTML = quantityStored;
                document.getElementById("totalproduct"+tempIndex).innerHTML = loadPrice(sumProductLine[indexItem]);
                document.getElementById("sumcolumn").innerHTML = loadPrice(cartTotal);
        });


        //Paramétrage bouton "+"
        const addQuantityBtn = document.getElementById("increment-button"+ i);

        addQuantityBtn.addEventListener('click', function() {
        
            quantityStored++;
            
            let indexItem = cartContent.indexOf(cartContent.find( cart => cart.nameProduct === itemCart.nameProduct));
            cartContent[indexItem].quantityProduct = quantityStored;
            
            let objLinea = JSON.stringify(cartContent);
            localStorage.setItem("cart", objLinea);

            arithmetic();
            let tempIndex = tempCart.indexOf(tempCart.find( cart => cart.nameProduct === itemCart.nameProduct));
            document.getElementById("quantity-product"+tempIndex).innerHTML = quantityStored;
            document.getElementById("totalproduct"+tempIndex).innerHTML = loadPrice(sumProductLine[indexItem]);
            document.getElementById("sumcolumn").innerHTML = loadPrice(cartTotal);
        
        });

        //Paramétrage bouton "effacer ligne produit"
        const deleteItemEl = document.getElementById("deleteitem"+i);

        deleteItemEl.addEventListener('click', function() {
            // on matche le bouton sur le bon produit du panier de référence pour les liaisons
            let tempIndex = tempCart.indexOf(tempCart.find( cart => cart.nameProduct === itemCart.nameProduct));
            // suppression de la ligne dans le DOM
            document.getElementById("cartlistproducts").removeChild(document.getElementById("lineproduct"+tempIndex));
            // on matche aussi sur le produit correspond dans le panier du localStorage
            let indexItem = cartContent.indexOf(cartContent.find( cart => cart.nameProduct === itemCart.nameProduct));
            // suppression de la ligne dans ce panier
            cartContent.splice(indexItem, 1);
            // mise à jour du localStorage
            let objLinea = JSON.stringify(cartContent);
            localStorage.setItem("cart", objLinea);
            // mise à jour des totaux
            if (cartContent.length !== 0) {
                arithmetic();
                document.getElementById("sumcolumn").innerHTML = loadPrice(cartTotal);
            } else {
               document.getElementById("statut-cart").innerHTML = `Votre panier est vide, consulter notre catalogue...`;
               document.getElementById("price-container").classList.add("d-none");
               document.getElementById("customerform").classList.add("d-none");
               localStorage.removeItem("cart"); 
            }

        });

    }


// Validation formulaire client
// validation en s'appuyant sur le DOM de chacun des inputs
for (let i=1; i < 6; i++) {
    
    const inputElement = document.getElementById("input"+i);

    inputElement.addEventListener('input', function() {

        if (inputElement.checkValidity() == false) {
            inputElement.classList.remove("is-valid");
            inputElement.classList.add("is-invalid");
            
        } else {
            inputElement.classList.remove("is-invalid");
            inputElement.classList.add("is-valid");
        }
        
        
        if (document.getElementById("customerform").checkValidity() == true) {
            document.getElementById("submitbtn").classList.add("bg-success");
        } else {
            document.getElementById("submitbtn").classList.remove("bg-success");
        }

    })
}


// Enregistrement de la commande

document.getElementById("submitbtn").addEventListener('click', event => {
    // On revalide à nouveau avant enregistrement le formulaire mais uniquement avec Javascript
    let input1El = document.getElementById("input1").value;
    let input2El = document.getElementById("input2").value;
    let input3El = document.getElementById("input3").value;
    let input4El = document.getElementById("input4").value;
    let input5El = document.getElementById("input5").value;

    const regexp1 = new RegExp(/^[A-Za-z ]{1,32}$/);
    const regexp2 = new RegExp(/^[A-Za-z0-9, _-]{3,60}$/);
    const regexp3 = new RegExp(/^[A-Za-z- ]{1,32}$/);
    const regexp4 = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
   
    // tant que les inputs ne sont pas valides on ne peut enregistrer la commande
    if (        input1El.value == "" || regexp1.test(input1El) == false 
            ||  input2El.value == "" || regexp1.test(input2El) == false
            ||  input3El.value == "" || regexp2.test(input3El) == false
            ||  input4El.value == "" || regexp3.test(input4El) == false
            ||  input5El.value == "" || regexp4.test(input5El) == false ) {
        
        event.preventDefault;

    } else {
        //on rassemble dans un objet les données du formulaire
        let contact = {
                firstName: document.getElementById("input1").value,
                lastName: document.getElementById("input2").value,
                address: document.getElementById("input3").value,
                city: document.getElementById("input4").value,
                email: document.getElementById("input5").value
            };        

        //contenu de la commande
        let products = [];
        /*  adaptation au format du panier accepté dans la method fetch post qui suit.
            On substitue les valeurs des quantités en répetant autant de fois que commandé
            l'id du produit dans le tableau products
        */
        for (i=0; i<cartContent.length; i++) {
                
            for (j=0; j<cartContent[i].quantityProduct; j++){

                let itemProd = cartContent[i].urlProduct;
                products.push(itemProd);

            }

        }
        /**Appel à l'API avec la method fetch option "post" pour enregistrer 
         * sur le serveur la commande (produit(s)+coordonnées visiteur)
         * certaines des données de la promesse résolue sont intégrées 
         * comme paramètres de l'url de la page suivante pour être réutilisées
         */
        const options = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({contact, products}),
            
        };

        fetch(urlPost, options)
            .then(response => response.json())
            .then(data => {
                document.location.href = `end-transaction.html?key1=${data.orderId}&key2=${data.contact.firstName}&key3=${document.getElementById("sumcolumn").textContent}&key4=${data.products.length}`;
            })
            .catch(error => alert("Erreur : " + error));
        
    }
})