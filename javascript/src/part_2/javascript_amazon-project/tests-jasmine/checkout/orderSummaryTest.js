import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import { loadFromStorage, cart } from "../../data/cart.js";
import { loadProducts } from "../../data/products.js";

describe('test suite: renderOrderSummary', () => {
    const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
    const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

    beforeAll((done) => {
        loadProducts(() => {
            done();
        });
    });
    
    beforeEach(() => {
        spyOn(localStorage, 'setItem');
        
        document.querySelector('.js-test-conatiner').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    it('displays the cart', () =>{
        const cartItemConatiner = document.querySelectorAll('.js-cart-item-container');
        expect(cartItemConatiner.length).toEqual(2);

        const productQuantity1 = document.querySelector(`.js-product-quantity-${productId1}`);
        expect(productQuantity1.innerText).toContain('Quantity: 2');

        const productQuantity2 = document.querySelector(`.js-product-quantity-${productId2}`);
        expect(productQuantity2.innerText).toContain('Quantity: 1');

        document.querySelector('.js-test-conatiner').innerHTML = '';
    });

    it('removes a product', () => {
        spyOn(localStorage, 'setItem');
        
        document.querySelector('.js-test-conatiner').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
        `;
        const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
        const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';
        spyOn(localStorage, 'getItem').and.callFake(() => {
            return JSON.stringify([{
                productId: productId1,
                quantity: 2,
                deliveryOptionId: '1'
            }, {
                productId: productId2,
                quantity: 1,
                deliveryOptionId: '2'
            }]);
        });
        loadFromStorage();

        renderOrderSummary();

        document.querySelector(`.js-delete-link-${productId1}`).click();
        const cartItemConatiner = document.querySelectorAll('.js-cart-item-container');
        expect(cartItemConatiner.length).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container-${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        document.querySelector('.js-test-conatiner').innerHTML = '';
    });
});
