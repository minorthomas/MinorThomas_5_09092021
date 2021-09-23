let productLocalStorage = JSON.parse(localStorage.getItem("cameraBasket"))
console.log(productLocalStorage)

const basketDom = () => {
    //Creation de l'element section dans main
    let basketSummary = document.createElement("section")
    basketSummary.setAttribute("id", "basket_summary")
    document.querySelector("#basket").appendChild(basketSummary)
    
    //Creation de l'element h2 dans section summary
    let basketTitle = document.createElement("h1")
    basketTitle.setAttribute("id", "basket_title")
    basketSummary.appendChild(basketTitle)
    basketTitle.textContent = "Votre panier"

    //Creation de l'element article dans section summary
    let basketOrder = document.createElement("article")
    basketSummary.appendChild(basketOrder)

    //Creation du titre de la commande
    let basketOrderTitle = document.createElement("h2")
    basketOrder.appendChild(basketOrderTitle)
    basketOrderTitle.textContent = "Détails de la commande"

    let basketRemove = document.createElement("span")
    basketOrder.appendChild(basketRemove)
    basketRemove.textContent = "Supprimer panier"

    //Creation d'une div qui englobe les détails de commande + le prix
    let basketDetails = document.createElement("div")
    basketDetails.setAttribute("id", "basket_details")
    basketOrder.appendChild(basketDetails)

    //Creation d'une div qui englobe les détails de commande
    let basketInfos = document.createElement("div")
    basketInfos.setAttribute("id", "basket_details_infos")
    basketDetails.appendChild(basketInfos)

    //Creation d'un paragraphe pour l'article principal + la quantité
    let basketProduct = document.createElement("p")
    basketInfos.appendChild(basketProduct)
    basketOrderTitle.textContent = "Article principal: "

    //Creation d'un paragraphe pour l'article secondaire
    let basketLenses = document.createElement("p")
    basketInfos.appendChild(basketLenses)
    basketOrderTitle.textContent = "Article secondaire: "

     let basketTotalPrice = document.createElement("span")
     basketDetails.appendChild(basketTotalPrice)
     basketOrderTitle.textContent = "Prix total" 
}

basketDom()
