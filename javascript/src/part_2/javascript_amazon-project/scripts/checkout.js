import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPymentSummary } from "./checkout/paymentSummary.js";
import { loadProducts } from "../data/products.js";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

loadProducts(() => {
    renderOrderSummary(); 
    renderPymentSummary();
});