const order = JSON.parse(localStorage.getItem("order"))

const addOrderInDom = () => {
    let orderIdDom = document.querySelector("#order_id")
    orderIdDom.textContent = order.orderId

    for (let i = 0; i < order.products.length; i++) {
        let orderPriceDom = document.querySelector("#order_price")

        let sum = 0
        for (let i = 0; i < order.products.length; i++) {
            sum = sum + order.products[i].price
        }
        orderPriceDom.textContent = sum / 100 + "€"
    }

    let returnButton = document.querySelector("#order_home")

    returnButton.addEventListener("click", (event) => {
        localStorage.removeItem("order")
    })
}

addOrderInDom()