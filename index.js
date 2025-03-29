import { menuArray } from '/data'

const items = document.getElementById('items')
const ordersDiv = document.getElementById('orders-div')
const menu = menuArray.map(function(item){
return `    <div class="item">
        <span id="item-id">${item.emoji}</span>
        <div id="item-info">
            <h1>${item.name}</h1>
            <h2>${item.ingredients}</h2>
            <h3>$${item.price}</h3>
        </div>
        <button id="order-btn" data-item="${item.id}">+</button>
    </div>
`}).join('')



const ordersArray = []

document.querySelector('.payment-container').style.display = 'none'


document.addEventListener('click', function(e){    
    menuArray.map(function(item){
if (e.target.dataset.item == item.id){
        ordersArray.push(item)
        renderOrders()
     }
     if (e.target.dataset.remove == item.id){
        const index = ordersArray.findIndex(order => order.id == e.target.dataset.remove)
        ordersArray.splice(index, 1)
        renderOrders()
     }
    if (e.target.id === "complete-order"){
    document.querySelector('.payment-container').style.display = 'block'
    }
     }
     )
})


items.innerHTML = menu

function renderOrders(){
    const totalPrice = ordersArray.reduce(function(currOrder, nextOrder){
        return currOrder + nextOrder.price
    },0)
     let orders = ordersArray.map(function(order){ 
return  `<h1 id="order-text">${order.name} <a data-remove="${order.id}">remove</a><span>$${order.price}</span></h1>`
        }).join('')
    
    if (!orders){
        orders = `<h2>You have not ordered anything yet</h2>`
    }
    
    ordersDiv.innerHTML = `<div class="orders">
    <h1 id="your-order">Your Order</h1>
    ` + orders + ` </div>
    <div class="total">
        <h1>Total price: <span>${totalPrice} </span></h1>
        <button id="complete-order" type="button" ${ordersArray.length === 0 ? 'disabled' : ''}>Complete order</button>
        </div>`
    
    
}

document.getElementById('pay-btn').addEventListener('click', function(){
          ordersDiv.innerHTML =`<div id="payment-complete">
        <p>Thanks, ${document.getElementById('fname').value}! Your order is on its way!</p>
    </div>`
    document.querySelector('.payment-container').style.display = 'none'
    })