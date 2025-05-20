import { cart, removeFromCart, updateDeliveryOption } from '../data/cart.js';
import { products } from '../data/products.js';
import { formatCurrency } from './Utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions} from '../data/deliveryOptions.js';



// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate)
// console.log(deliveryDate.format('dddd', 'MMMM', 'D'))
let cartSummaryHTML = '';

cart.forEach((cartItem) => {
  
  const productId = cartItem.productId;
  let matchingProduct = null;

  products.forEach((product) => {
    if (product.id === productId) {
      matchingProduct = product;
    }
  });

  if (!matchingProduct) {
    // Skip this cart item if no matching product is found
    return;
  }

  const deliveryOptionId = cartItem.deliveryOptionId;
    
  let deliveryOption;

  deliveryOptions.forEach((option) => {
    if(option.id == deliveryOptionId){
      deliveryOption = option;
    }

  });

  

   const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM  D');

  
  cartSummaryHTML += `
    
       
      <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src="${matchingProduct.image}">

          <div class="cart-item-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-price">
              $${formatCurrency(matchingProduct.priceCents)}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary">
                Update
              </span>
              <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingProduct.id}>
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
           
              
                 ${deliveryOptionsHTML(matchingProduct, cartItem)}
          </div>
        </div>
      </div>
    
  `;
});

function deliveryOptionsHTML(matchingProduct, cartItem){
  let html = '';

  deliveryOptions.forEach((dO) =>{

    const today = dayjs();
    const deliveryDate = today.add(dO.deliveryDays, 'days');
    const dateString = deliveryDate.format('dddd, MMMM D');
    const priceString = dO.PriceCents === 0 ? 'FREE' : `$${formatCurrency(dO.PriceCents)}`
    const isChecked = dO.id === cartItem.deliveryOptionId;
    html +=  `
    <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id="${dO.id}">
              <input type="radio" ${isChecked? 'checked': ''}
                class="delivery-option-input"
                name="delivery-option-${matchingProduct.id}">
              <div>
                <div class="delivery-option-date">
                  ${dateString}
                </div>
                <div class="delivery-option-price">
                  ${priceString} Shipping
                </div>
              </div>
            </div>
    `
});

return html; 
}
document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link').forEach((link) => {
  link.addEventListener('click', () => {
     const productId = link.dataset.productId;
     
     removeFromCart(productId);

     const container = document.querySelector(
      `.js-cart-item-container-${productId}`
     );
     container.remove();
  });
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const productId = element.dataset.productId;
    const deliveryOptionId = element.dataset.deliveryOptionId;
    updateDeliveryOption(productId, deliveryOptionId);
  });
});
