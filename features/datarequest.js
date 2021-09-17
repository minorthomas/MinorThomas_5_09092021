let camerasUrl = 'http://localhost:3000/api/cameras'

fetch(camerasUrl)
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
  
    //creer l'element section
    let products = document.createElement("section")
    products.classList.add("container")
    document.querySelector("main").appendChild(products)

    for (let cameras of data) {
      //creer et ajoute les elements article dans la section
      let product = document.createElement("article")
      product.classList.add("product")
      products.appendChild(product)

      //creer et ajoute les elements img dans chaque article
      let productImage = document.createElement("img")
      productImage.classList.add("product_img")
      product.appendChild(productImage)
      //ajoute l'image dans la balise img
      //productImage.innerHTML = cameras.imageUrl

      //creer et ajoute les elements h2 dans chaque article
      let productTitle = document.createElement("h2")
      productTitle.classList.add("product_title")
      product.appendChild(productTitle)
      //ajoute le nom dans la balise h2
      productTitle.textContent = cameras.name

      //creer et ajoute les elements p et span dans chaque article
      let productInfo= document.createElement("div")
      productInfo.classList.add("product_info")
      product.appendChild(productInfo)

      //creer et ajoute les elements p dans chaque article
      let productDescription = document.createElement("p")
      productInfo.appendChild(productDescription)
      //ajoute la description dans la balise p
      productDescription.textContent = cameras.description

      //creer et ajoute les elements span dans chaque article
      let productPrice = document.createElement("span")
      productInfo.appendChild(productPrice)
      //ajoute le prix dans la balise span
      productPrice.textContent = cameras.price

    }
  })