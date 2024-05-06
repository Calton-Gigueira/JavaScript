import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts, loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
  try {
    await loadProductsFetch();
  
    const value = await new Promise((resolve) => {
      loadCart(() => {
        resolve('value3');
      });
    });
    
  } catch(error) {
    console.log("Unexpected error. Please try again later.");
  }

  renderOrderSummary();
  renderPymentSummary();
}

loadPage();

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

]).then(() => {
    renderOrderSummary();
    renderPymentSummary();
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });

}).then(() =>{
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPymentSummary();
});
*/
