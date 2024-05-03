import { renderOrderSummary } from "./checkout/orderSummary";
import { renderPymentSummary } from "./checkout/paymentSummary";
import { loadProducts } from "../data/products";
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

loadProducts(() => {
    renderOrderSummary(); 
    renderPymentSummary();
});