let searchUrlParams = window.location.search //Recupère la key id dans l'url
let getUrlParams = new URLSearchParams(searchUrlParams) 
let getIdParam = getUrlParams.get("id") //Recupère l'id sans le ?

let cameraUrl = `http://localhost:3000/api/cameras/${getIdParam}`

fetch(cameraUrl)
  .then((response) => response.json())
  .then((camera) => {

  addCameraInDom(camera)

}).catch((error) => {
  error = document.createElement("div")
  error.setAttribute("id", "error")
  error.classList.add("container")
  document.querySelector("#product").appendChild(error)
  error.textContent = "Une erreur est survenue, nous ne parvenons pas à communiquer avec le serveur. Vérifiez bien que celui-ci est démarré !"
})

const addCameraInDom = (camera) => {
  let products = document.createElement("div")
  products.setAttribute("id", "product_container")
  products.classList.add("container")
  document.querySelector("main").appendChild(products)

  let product = document.createElement("article")
  product.setAttribute("id", "product")
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
  productSelectLenses.classList.add("form-select")
  productFormLenses.appendChild(productSelectLenses)

  //Boucle pour afficher toutes les lentilles dans le choix du formulaire
  for (let i = 0; i < (camera.lenses).length; i++) {
    let productOptionsLenses = document.createElement("option")
    productOptionsLenses.setAttribute("value", `${camera.lenses[i]}`)
    productSelectLenses.appendChild(productOptionsLenses)
    productOptionsLenses.textContent = "Lentille de " + camera.lenses[i]
  }

  let pageTitle = document.querySelector('title')
  pageTitle.textContent = "Orinoco - " + camera.name

  //Creation du bouton d'envoi au panier
  let addBasket = document.createElement("button")
  addBasket.setAttribute("id", "product_add_basket")
  addBasket.setAttribute("type", "submit")
  addBasket.setAttribute("name", "product_add_basket")
  addBasket.classList.add("btn")
  addBasket.textContent = "Ajouter au panier"
  product.appendChild(addBasket)

  //Recupere le bouton "Ajouter au panier" et creer un événement au moment du click
  let buttonAddToCart = document.querySelector("#product_add_basket")
  buttonAddToCart.addEventListener("click", (event) => {  //Ecoute le bouton "Ajouter au panier"
    event.preventDefault()

    addBasket.innerHTML = "Article ajouté"
    addBasket.style.backgroundColor = "rgb(111, 252, 3)"

    //Recupere la valeur de la lentille choisie
    let idLenses = document.querySelector("#product_form_lenses")
    let choiceLenses = idLenses.value

    //Recupere les valeurs du formulaire
    objectProduct = {
      name: camera.name,
      id: camera._id,
      lenses: choiceLenses,
      price: camera.price
    }
    
    // //----------------Localstorage
    let productLocalStorage = JSON.parse(localStorage.getItem("products"))

    // //Si il y a déjà la key dans le local storage
    if (productLocalStorage) {
      productLocalStorage.push(objectProduct)
      localStorage.setItem("products", JSON.stringify(productLocalStorage))
    } else {
      productLocalStorage = []
      productLocalStorage.push(objectProduct)
      localStorage.setItem("products", JSON.stringify(productLocalStorage))
    }
  })
}


