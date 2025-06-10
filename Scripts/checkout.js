import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";


renderOrderSummary();
renderPaymentSummary();



export function updateCartQuantity(){
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const itemCount = cart.length;

  const homeLink = document.querySelector('.js-return-to-home-link');
  if (homeLink) {
    homeLink.innerHTML = itemCount + (itemCount === 0 || itemCount === 1 ? ' item' : ' items');
  }

}

document.addEventListener('DOMContentLoaded', function(){
    updateCartQuantity();
})

