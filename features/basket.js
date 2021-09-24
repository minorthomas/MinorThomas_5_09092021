let productLocalStorage = JSON.parse(localStorage.getItem("cameraBasket"))
console.log(productLocalStorage)

const basketDom = () => {
    //Creation de la section qui englobe le RECAPITULATIF du panier
    let basketSummary = document.createElement("section")
    basketSummary.setAttribute("id", "basket_summary")
    basketSummary.classList.add("container")
    document.querySelector("#basket").appendChild(basketSummary)

    //Creation du titre du panier
    let basketTitle = document.createElement("h2")
    basketTitle.textContent = "Détails de la commande"
    basketSummary.appendChild(basketTitle)

    //Creation du si le localStorage est vide, affiché "panier vide" sinon afficher la boucle for et les articles
    if (productLocalStorage === null) {
        let basketEmpty = document.createElement("p")
        basketEmpty.setAttribute("id", "basket_empty")
        basketEmpty.textContent = "Votre panier est vide"
        basketSummary.appendChild(basketEmpty)
    } else {
        for (let i = 0; i < productLocalStorage.length; i++) {
            let basketArticle = document.createElement("article")
            basketSummary.appendChild(basketArticle)
    
            //Creation de la div qui englobe les details du panier
            let basketProducts = document.createElement("div")
            basketProducts.classList.add("basketDetails")
            basketArticle.appendChild(basketProducts)

            //Creation du paragraphe principal qui englobe l'article + quantité + prix
            let basketFirstProduct = document.createElement("p")
            basketFirstProduct.classList.add("basket_first_product")
            basketFirstProduct.textContent = productLocalStorage.price

            let basketProductPrice = document.createElement("span")
            basketProductPrice.classList.add("basket_product_price")

            basketProducts.appendChild(basketFirstProduct)
            basketProducts.appendChild(basketProductPrice)

            //Creation du paragraphe secondaire qui englobe l'article secondaire
            let basketSecondProduct = document.createElement("p")
            basketSecondProduct.classList.add("basket_second_product")
            basketProducts.appendChild(basketSecondProduct)
        }

        //creation du footer qui englobe le prix total + vider le panier complétement
        let basketFooter = document.createElement("footer")
        basketFooter.setAttribute("id", "basket_footer")
        basketSummary.appendChild(basketFooter)

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
