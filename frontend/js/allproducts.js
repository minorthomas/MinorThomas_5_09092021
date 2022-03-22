let camerasUrl = 'http://localhost:3000/api/cameras'

fetch(camerasUrl)
  .then((response) => response.json())
  .then((cameras) => {

    addCamerasInDom(cameras)

  }).catch((error) => {
    error = document.createElement("div")
    error.setAttribute("id", "error")
    error.classList.add("container")
    document.querySelector("#products").appendChild(error)
    error.textContent = "Une erreur est survenue, nous ne parvenons pas à communiquer avec le serveur. Vérifiez bien que celui-ci est démarré !"
  })

const addCamerasInDom = (cameras) => {
  //creer l'element section
  let products = document.createElement("div")
  products.setAttribute("id", "products")
  products.classList.add("container")
  document.querySelector("#products").appendChild(products)


  for (let camera of cameras) {

    //creer et ajoute les elements article dans la section
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

    //creer et ajoute les elements p et span dans chaque article
    let productInfo= document.createElement("div")
    productInfo.classList.add("product_info")
    productLink.appendChild(productInfo)

    //creer et ajoute les elements h2 dans chaque article
    let productTitle = document.createElement("h2")
    productTitle.classList.add("product_title")
    productInfo.appendChild(productTitle)
    //ajoute le nom dans la balise h2
    productTitle.textContent = camera.name

    //creer et ajoute les elements span dans chaque article
    let productMore = document.createElement("span")
    productMore.classList.add("btn")
    productInfo.appendChild(productMore)
    //ajoute le prix dans la balise span
    productMore.textContent = "En savoir plus"
  }
}