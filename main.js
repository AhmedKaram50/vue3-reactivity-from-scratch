import { reactive, effect, ref, reactive_vue2 } from "./reactivity";
import { watcher, reactive_vue2 as reactive_vue2_v2 } from "./reactivity_observer";

console.log("_".repeat(20));
// * Vue 2 Test
const data = reactive_vue2_v2({
  n1: 2,
  n2: 4,
  n3: 10,
  n4: 40,
});

watcher(() => {
  console.log("target1");
  let n1TimesN2 = data.n1 * data.n2;
  document.getElementById("n1_times_n2").innerHTML = `(${n1TimesN2})`;
})

watcher(() => {
  console.log("target2");
  let n3PlusN4 = data.n3 + data.n4;
  document.getElementById("n3_plus_n4").innerHTML = `(${n3PlusN4})`;
})

// data.n1 = 4;
// data.n2 = 6;
// data.n3 = 20;
data.n4 = 20;
data.n4 = 200;

console.log("_".repeat(20));
// * Vue 3 Test
let product = reactive({
  price: 20,
  quantity: 2,
  discount: 5,
});

let total = 0;
let total2 = 0;
let total1PlusTotal2 = 0;
let sale = 0;

effect(() => {
  total = product.price * product.quantity;
  document.querySelector(".effect").innerHTML = total;
});

effect(() => {
  total2 = product.price - product.discount;
  document.querySelector(".effect2").innerHTML = total2;
});

effect(() => {
  console.log("foo is", product.foo);
});

// effect(() => {
//   total1PlusTotal2 = total + total2;
//   document.querySelector(".effect3").innerHTML = total1PlusTotal2;
// });

console.log(total, total2); // 40, 15, 55, 27.5
product.price = 10;
console.log(total, total2); // 20, 5, 25, 12.5

product.foo = 99;
product.foo = 991;

console.log("=".repeat(10));

// * Vue 2 Test
let product2 = reactive_vue2({
  price: 20,
  quantity: 2,
  discount: 5,
});

effect(() => {
  total = product2.price * product2.quantity;
  document.querySelector(".effect").innerHTML = total;
});

effect(() => {
  total2 = product2.price - product2.discount;
  document.querySelector(".effect2").innerHTML = total2;
});

effect(() => {
  console.log("foo is", product2.foo);
});

console.log(total, total2); // 40, 15, 55, 27.5
product2.price = 10;
console.log(total, total2); // 20, 5, 25, 12.5

product2.foo = 99; // Doesn't run the effect so it will not work
