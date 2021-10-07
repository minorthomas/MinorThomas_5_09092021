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
            basketProductPrice.innerHTML = productLocalStorage[i].price / 100 + "€"

            let basketRemoveArticle = document.createElement("button")
            basketRemoveArticle.classList.add("basket_clear", "btn")
            basketArticle.appendChild(basketRemoveArticle)
            basketRemoveArticle.textContent = "Supprimer l'article"

            let productSeparation = document.createElement("div")
            productSeparation.classList.add("product_separation")
            document.querySelector("#basket_summary").appendChild(productSeparation)
        }
    }
}

const calculateTotalPrice = () => {
    if (productLocalStorage === null){
        let totalPrice = document.querySelector("#basket_total_price")
        totalPrice.textContent = "0"

    } else {
        //creer une boucle qui va permettre de recuperer chaque prix et de les ajouter au tableau
        let sum = 0
        for (let i = 0; i < productLocalStorage.length; i++) {
            sum = sum + productLocalStorage[i].price
        }
        let totalPrice = document.querySelector("#basket_total_price")
        totalPrice.textContent = sum / 100
    }
}

//--------------------------------------------

const clearOneProduct = () => {
    let clearButton = document.querySelectorAll(".basket_clear")

    for (let i = 0; i < clearButton.length; i++) {
        clearButton[i].addEventListener("click", (event) => {

            console.log(i)
        
            // console.log(productRemove)

            // location.reload()
        })
    }
}

//recuperer les boutons supprimer article
//sur chaque bouton doit avoir l'id de l'article
//au moment du clic le bouton reconnai l'id de l'article 
//après le clic supprimer l'article
//renvoyer le code dans le localstorage pour quil retire completement l'article

//------------------------
const clearAllProducts = () => {
    let clearAllButton = document.querySelector("#clear_all_products")
    clearAllButton.classList.add("btn", "btn-white")

    clearAllButton.addEventListener("click", (e) => {
        localStorage.removeItem("cameraBasket")
        location.reload()
    })
}

basketDom()
calculateTotalPrice()
clearOneProduct()
clearAllProducts()