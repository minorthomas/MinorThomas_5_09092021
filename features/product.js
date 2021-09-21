//creer une card avec le produit
//---- recuperer l'id
//---- recuperer le nom
//---- recuperer la description
//---- recuperer le prix
//---- bouton ajouter au panier 
//---- bouton choisir objectif
//---- bouton quantité de produit

let searchUrlParams = window.location.search //Recupère la key id dans l'url
let getUrlParams = new URLSearchParams(searchUrlParams) //Recupère les paramètres de l'url
let getIdParam = getUrlParams.get("id") //Recupère l'id sans le ?


let cameraUrl = `http://localhost:3000/api/cameras/${getIdParam}`

fetch(cameraUrl)
  .then((response) => response.json())
  .then((camera) => {
    console.log(camera)
    
    let products = document.createElement("div")
    products.setAttribute("id", "products")
    products.classList.add("container")
    document.querySelector("main").appendChild(products)

    let product = document.createElement("article")
    product.classList.add("product")
    products.appendChild(product)

    let productLink = document.createElement("a")
    let Url = camera._id      
    productLink.setAttribute("href", `./pages/product.html?id=${Url}`)
    productLink.classList.add("product_link")
    product.appendChild(productLink)


    //creer et ajoute les elements img dans chaque article
    let productImage = document.createElement("img")
    productImage.setAttribute("alt", "Appareil photo")
    productImage.classList.add("product_img")
    productLink.appendChild(productImage)
    //ajoute l'image dans la balise img
    productImage.src = camera.imageUrl

    //creer et ajoute les elements h2 dans chaque article
    let productTitle = document.createElement("h2")
    productTitle.classList.add("product_title")
    productLink.appendChild(productTitle)
    //ajoute le nom dans la balise h2
    productTitle.textContent = camera.name

    //creer et ajoute les elements p et span dans chaque article
    let productInfo= document.createElement("div")
    productInfo.classList.add("product_info")
    productLink.appendChild(productInfo)

    //creer et ajoute les elements p dans chaque article
    let productDescription = document.createElement("p")
    productInfo.appendChild(productDescription)
    //ajoute la description dans la balise p
    productDescription.textContent = camera.description

    //creer et ajoute les elements span dans chaque article
    let productPrice = document.createElement("span")
    productInfo.appendChild(productPrice)
    //ajoute le prix dans la balise span
    productPrice.textContent = camera.price + "€"
})

