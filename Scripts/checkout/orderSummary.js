import { cart, removeFromCart, updateDeliveryOption } from '../../data/cart.js';
import { products } from '../../data/products.js';
import { formatCurrency } from '../Utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import {deliveryOptions} from '../../data/deliveryOptions.js';
import { updateCartQuantity } from '../checkout.js';
import { updateQuantity } from '../../data/cart.js';



// const today = dayjs();
// const deliveryDate = today.add(7, 'days');
// console.log(deliveryDate)
// console.log(deliveryDate.format('dddd', 'MMMM', 'D'))

export function renderOrderSummary(){
  
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

                    <span class="update-quantity-link link-primary  js-update-link" data-update-id="${matchingProduct.id}">
                      Update
                    </span>

                   <input class="quantity-input js-quantity-input" value="${cartItem.quantity}" />

                    <span class = "save-quantity-link link-primary js-save-link" data-product-id="${matchingProduct.id}">Save</span>


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
          updateCartQuantity()
        });
      });

      document.querySelectorAll('.js-update-link').forEach((update) => {
        update.addEventListener('click', () =>{
          const updateID = update.dataset.updateId
          console.log(updateID)


            const container = document.querySelector(
            `.js-cart-item-container-${updateID}`
          );
          container.classList.add('is-editing-quantity');
        });

      });

  document.querySelectorAll('.js-save-link').forEach((saveLink) => {
  saveLink.addEventListener('click', () => {
    const productId = saveLink.dataset.productId;

    const container = document.querySelector(`.js-cart-item-container-${productId}`);

    // ✅ Step 2: Get the new quantity from the input
    const quantityInput = container.querySelector('.js-quantity-input');
    const newQuantity = Number(quantityInput.value); // Convert to number

    
      if (isNaN(newQuantity) || newQuantity < 1 || newQuantity > 999) {
        alert('Please enter a quantity between 1 and 999.');
        return; // Stop the rest of the function
      }
    
    // ✅ Update the cart
    updateQuantity(productId, newQuantity);

    // ✅ Update the visible quantity label
    const label = container.querySelector('.quantity-label');
    label.innerText = newQuantity;

    // ✅ Step 1: Exit edit mode
    container.classList.remove('is-editing-quantity');
  });
});




      document.querySelectorAll('.js-delivery-option').forEach((element) => {
        element.addEventListener('click', () => {
          const productId = element.dataset.productId;
          const deliveryOptionId = element.dataset.deliveryOptionId;
          updateDeliveryOption(productId, deliveryOptionId);
        });
      });
}

