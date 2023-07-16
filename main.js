import { reactive, effect } from "./reactivity";

let product = reactive({
  price: 20,
  quantity: 2,
  discount: 5,
});

let total = 0;
let total2 = 0
let fullName = "Ahmed Karam";

const user = {
  firstName: "Ahmed",
  lastName: "Karam",
};

effect(() => {
  total = product.price * product.quantity;
  document.querySelector(".effect").innerHTML = total;
});

effect(() => {
  total2 = product.price - product.discount;
  document.querySelector(".effect2").innerHTML = total2;
});

product.quantity = 10
product.discount = 10
console.log(product.quantity);
console.log(product.quantity);
console.log(product.quantity);
