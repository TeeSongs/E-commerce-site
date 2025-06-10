import {renderOrderSummary} from '../../Scripts/checkout/orderSummary.js';
import {loadFromStorage} from '../../data/cart.js';

describe(`test suite: renderOrderSummary`, () => {
  it (`displays the cart`, () => {
    document.querySelector('.js-test-container').innerHTML =`<div class="js-order-summary"></div>`;



     spyOn (localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([
            { 
              productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              quantity: 1,
              deliveryOptionId: '1'
            },
            {
              productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
              quantity: 2,
              deliveryOptionId: '2'
            }
          ]);
        });
        
        loadFromStorage();
        renderOrderSummary();


        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(2);
        
        expect(document.querySelector('.js-order-summary').innerHTML).toContain('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
        expect(document.querySelector('.js-order-summary').innerHTML).toContain('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(document.querySelector('.js-order-summary').innerHTML).toContain('1');
        expect(document.querySelector('.js-order-summary').innerHTML).toContain('2');
  });
    it (`removes a product`, () => {
      document.querySelector('.js-test-container').innerHTML =`<div class="js-order-summary"></div>`;

      spyOn (localStorage, 'getItem').and.callFake(() => {
          return JSON.stringify([
            { 
              productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
              quantity: 1,
              deliveryOptionId: '1'
            }
          ]);
        });
        
        loadFromStorage();
        renderOrderSummary();

        const deleteLink = document.querySelector('.js-delete-link');
        deleteLink.click();

        expect(document.querySelectorAll('.js-cart-item-container').length).toEqual(0);

       

    });
});
