let productLocalStorage = JSON.parse(localStorage.getItem("products"))
const basketEmpty = () => {
    let basketEmpty = document.createElement("p")
    basketEmpty.setAttribute("id", "basket_empty")
    basketEmpty.textContent = "Votre panier est vide"
    document.querySelector("#basket_summary").appendChild(basketEmpty)
}

//---------------------------------------Ajout dans le DOM

const basketDom = () => {
    
    //Creation du si le localStorage est vide, affiché "panier vide" sinon afficher la boucle for et les articles
    if (productLocalStorage === null) {
        basketEmpty()
        let form = document.querySelector("#form")
        form.style.display = "none"
    } else {
        form.style.display = "block"
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

//----------------------------------- Calcul le prix total des articles du panier

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

//-------------------------------------------- Retire un produit du panier

const clearOneProduct = () => {
    let clearButton = document.querySelectorAll(".basket_clear")

    for (let i = 0; i < clearButton.length; i++) {
            clearButton[i].addEventListener("click", (event) => {

            productLocalStorage.splice(i, 1)
            localStorage.setItem("products", JSON.stringify(productLocalStorage))

            location.reload()
        })
    }
}

//------------------------ Retire tout le panier

const clearAllProducts = () => {
    let clearAllButton = document.querySelector("#clear_all_products")
    clearAllButton.classList.add("btn", "btn-white")

    clearAllButton.addEventListener("click", (e) => {
        localStorage.removeItem("cameraBasket")
        location.reload()
    })
}

//------------------------ Envoi le formulaire dans la localstorage

const sendForm = () => {
    let buttonSendForm = document.querySelector("#button_send_form")

    buttonSendForm.addEventListener("click", (event) => {
        event.preventDefault()

        //Creer un objet avec toutes les valeurs du formulaire du panier
        const contact = {
            firstName: document.querySelector(".firstname").value,
            lastName: document.querySelector(".lastname").value,
            email: document.querySelector(".email").value,
            address: document.querySelector(".adress").value,
            city: document.querySelector(".city").value
        }

        //Creer une fonction qui permet de tester des string avec caractères spéciaux
        const testStringWithSpecialCharacters = (value) => {
            return /^[A-Za-z\s,éèà.'-]{3,20}$/.test(value);
        }

        //Creer une fonction qui permet de tester lune adresse mail
        const testEmailAdress = (value) => {
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
        }

        const testStringWithNumbers = (value) => {
            return /^[a-zA-Z0-9\s,éèà.'-]{5,50}$/.test(value)
        }

        //Test toutes les valeurs du formulaire

        const testFirstName = () => {
            let firstNameValue = contact.firstName

            if (testStringWithSpecialCharacters(firstNameValue)) {
                return true
            } else {
                return false
            }
        }

        const testLastName = () => {
            let lastNameValue = contact.lastName

            if (testStringWithSpecialCharacters(lastNameValue)) {
                return true
            } else {
                return false
            }
        }

        const testEmail= () => {
            let emailValue = contact.email

            if (testEmailAdress(emailValue)) {
                return true
            } else {
                return false
            }
        }

        const testAdress= () => {
            let addressValue = contact.address

            if (testStringWithNumbers(addressValue)) {
                return true
            } else {
                return false
            }
        }

        const testCity= () => {
            let cityValue = contact.city

            if (testStringWithSpecialCharacters(cityValue)) {
                return true
            } else {
                return false
            }
        }

        let formError = document.querySelector("#form_error")

        //Envoi l'objet du formulaire dans le localstorage si celui-ci est bien rempli & le converti en string
        if (testFirstName() && testLastName() && testEmail() && testAdress() && testCity()) {
            localStorage.setItem("contact", JSON.stringify(contact))
            formError.style.display = "none"
            //Envoi des données avec fetch() et la requête post vers (http://localhost:3000/api/cameras/order)
            let orderUrl = "http://localhost:3000/api/cameras/order"

            let products = []

            for (listId of productLocalStorage) {
                products.push(listId.id)
            }

            //Méthode "POST" avec fetch()
            fetch (orderUrl, {
                method: "POST",
                body: JSON.stringify({contact, products}),
                headers: {
                    "Accept" : "application/json",
                    "Content-Type" : "application/json",
                },
            }).then((response) => response.json())
              .then((data) => {
                localStorage.setItem("order", JSON.stringify(data))
                document.location.href = "order.html"
                localStorage.removeItem("products")
                localStorage.removeItem("contact")
            }) 
            .catch(function(error){
                console.log("erreur: " + error);
            });

        } else if (testFirstName() === false) {
            formError.style.display = "flex"
            formError.innerHTML = "Le prénom n'est pas valide. 20 caractères maximum!"
        } else if (testLastName() === false) {
            formError.style.display = "flex"
            formError.innerHTML = "Le nom n'est pas valide. 20 caractères maximum!"
        } else if (testEmail() === false) {
            formError.style.display = "flex"
            formError.innerHTML = "L'email n'est pas valide"
        } else if (testAdress() === false) {
            formError.style.display = "flex"
            formError.innerHTML = "L'adresse n'est pas valide. 50 caractères maximum!"
        } else if (testCity() === false) {
            formError.style.display = "flex"
            formError.innerHTML = "La ville n'est pas valide. 20 caractères maximum!"
        }


        
    })
}

basketDom()
calculateTotalPrice()
clearOneProduct()
clearAllProducts()
sendForm()