//creer une card avec le produit
//---- recuperer l'id
//---- recuperer le nom
//---- recuperer la description
//---- recuperer le prix
//---- bouton ajouter au panier 
//---- bouton choisir objectif
//---- bouton quantité de produit

let searchUrlParams = window.location.search //Recupère la key id dans l'url
let getUrlParams = new URLSearchParams(searchUrlParams) 
let getIdParam = getUrlParams.get("id") //Recupère l'id sans le ?

let cameraUrl = `http://localhost:3000/api/cameras/${getIdParam}`

fetch(cameraUrl)
  .then((response) => response.json())
  .then((camera) => {

  addCameraInDom(camera)

})

function addCameraInDom (camera) {
  let products = document.createElement("div")
  products.setAttribute("id", "products")
  products.classList.add("container")
  document.querySelector("main").appendChild(products)

  let product = document.createElement("article")
  product.classList.add("product")
  products.appendChild(product)

  //creer et ajoute les elements img dans chaque article
  let productImage = document.createElement("img")
  productImage.setAttribute("alt", "Appareil photo")
  productImage.classList.add("product_img")
  product.appendChild(productImage)
  //ajoute l'image dans la balise img
  productImage.src = camera.imageUrl

  //creer et ajoute les elements h2 dans chaque article
  let productTitle = document.createElement("h2")
  productTitle.classList.add("product_title")
  product.appendChild(productTitle)
  //ajoute le nom dans la balise h2
  productTitle.textContent = camera.name

  //creer et ajoute les elements p et span dans chaque article
  let productInfo = document.createElement("div")
  productInfo.classList.add("product_info")
  product.appendChild(productInfo)

  //creer et ajoute les elements p dans chaque article
  let productDescription = document.createElement("p")
  productInfo.appendChild(productDescription)
  //ajoute la description dans la balise p
  productDescription.textContent = camera.description

  //creer et ajoute les elements span dans chaque article
  let productPrice = document.createElement("span")
  productInfo.appendChild(productPrice)
  //ajoute le prix dans la balise span
  productPrice.textContent = camera.price / 100 + "€"

  //Creation du formulaire qui permet de choisir une lentille
  let productFormLenses = document.createElement("form")
  product.appendChild(productFormLenses)

  let productLabelLenses = document.createElement("label")
  productLabelLenses.setAttribute("for", "product_lenses")
  productFormLenses.appendChild(productLabelLenses)

  let productSelectLenses = document.createElement("select")
  productSelectLenses.setAttribute("name", "product_lenses")
  productSelectLenses.setAttribute("id", "product_form_lenses")
  productFormLenses.appendChild(productSelectLenses)

  //Boucle pour afficher toutes les lentilles dans le choix du formulaire
  for (let i = 0; i < (camera.lenses).length; i++) {
    let productOptionsLenses = document.createElement("option")
    productOptionsLenses.setAttribute("value", `${camera.lenses[i]}`)
    productSelectLenses.appendChild(productOptionsLenses)
    productOptionsLenses.textContent = "Lentille de " + camera.lenses[i]
  }

  
  //Creation du formulaire qui permet de choisir la quantité de produit voulu
  let productSelectQuantity = document.createElement("select")
  productSelectQuantity.setAttribute("name", "product_quantity")
  productSelectQuantity.setAttribute("id", "product_form_quantity")
  productFormLenses.appendChild(productSelectQuantity)

  for (let i = 1; i < 100; i++) {
    let productOptionsQuantity = document.createElement("option")
    productOptionsQuantity.setAttribute("value", i)
    productSelectQuantity.appendChild(productOptionsQuantity)
    productOptionsQuantity.textContent = i
  }

  //Creation du bouton d'envoi au panier
  let addBasket = document.createElement("button")
  addBasket.setAttribute("id", "product_add_basket")
  addBasket.setAttribute("type", "submit")
  addBasket.setAttribute("name", "product_add_basket")
  addBasket.textContent = "Ajouter au panier"
  product.appendChild(addBasket)


  //Recupere le bouton "Ajouter au panier" et creer un événement au moment du click
  let addBasketButton = document.querySelector("#product_add_basket")
  addBasketButton.addEventListener("click", (event) => {  //Ecoute le bouton "Ajouter au panier"
    event.preventDefault()

    //Recupere la valeur de la lentille choisie
    let idLenses = document.querySelector("#product_form_lenses")
    let choiceLenses = idLenses.value

    //Recupere la valeur de la lentille choisie
    let idQuantity = document.querySelector("#product_form_quantity")
    let choiceQuantity = idQuantity.value

    //Recupere les valeurs du formulaire
    let addProductBasket = {
      name: camera.name,
      id: camera._id,
      lenses: choiceLenses,
      quantity: choiceQuantity,
      price: camera.price * choiceQuantity / 100 + "€"
    }
    console.log(addProductBasket)
  })
}


