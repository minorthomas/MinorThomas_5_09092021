let productLocalStorage = JSON.parse(localStorage.getItem("cameraBasket"))

const basketDom = () => {
    
    //Creation du si le localStorage est vide, affiché "panier vide" sinon afficher la boucle for et les articles
    if (productLocalStorage === null) {
        let basketEmpty = document.createElement("p")
        basketEmpty.setAttribute("id", "basket_empty")
        basketEmpty.textContent = "Votre panier est vide"
        document.querySelector("#basket_summary").appendChild(basketEmpty)
    } else {
        for (let i = 0; i < productLocalStorage.length; i++) {
            let basketArticle = document.createElement("article")
            document.querySelector("#basket_summary").appendChild(basketArticle)
    
            //Creation de la div qui englobe les details du panier
            let basketProducts = document.createElement("div")
            basketProducts.classList.add("basket_products")
            basketArticle.appendChild(basketProducts)

            //Creation du paragraphe principal qui englobe l'article + quantité + prix
            let basketFirstProduct = document.createElement("p")
            basketFirstProduct.classList.add("basket_first_product")
            basketProducts.appendChild(basketFirstProduct)            
            basketFirstProduct.textContent = "Article: " + "Appareil photo " + productLocalStorage[i].name

            //Creation du paragraphe secondaire qui englobe l'article secondaire
            let basketSecondProduct = document.createElement("p")
            basketSecondProduct.classList.add("basket_second_product")
            basketProducts.appendChild(basketSecondProduct)
            basketSecondProduct.textContent = "Lentille: " + productLocalStorage[i].lenses

            //Creation du div pour le prix
            let basketProductPrice = document.createElement("div")
            basketProductPrice.classList.add("basket_product_price")
            basketArticle.appendChild(basketProductPrice)            
            basketProductPrice.textContent = productLocalStorage[i].price

            let basketRemoveArticle = document.createElement("div")
            basketRemoveArticle.classList.add("basket_clean")
            basketArticle.appendChild(basketRemoveArticle)
            basketRemoveArticle.textContent = "Supprimer l'article"
        }

        //creation du footer qui englobe le prix total + vider le panier complétement
        let basketFooter = document.createElement("footer")
        basketFooter.setAttribute("id", "basket_footer")
        document.querySelector("#basket_summary").appendChild(basketFooter)

        //Creation paragraphe prix total du panier
        let basketPriceAll = document.createElement("p")
        basketPriceAll.setAttribute("id", "basket_price_all")
        basketFooter.appendChild(basketPriceAll)

        //Creation div vider le panier
        let basketCleanAll = document.createElement("div")
        basketCleanAll.setAttribute("id", "basket_clean_all")
        basketFooter.appendChild(basketCleanAll)
    }
}

//section -> h2, article,
//boucle for (pour l'article -> div details, p article principal, p article secondaire, span prix)
//pour la div -> span prix total, div vider le panier

basketDom()
