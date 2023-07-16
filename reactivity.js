let total = 0;

const product = {
    price: 20,
    quantity: 0,
    discount: 0,
}

// The Dep is the effects of every variable or prop 

const depsMap = new Map()

const effect = () => {
  total = product.price * product.quantity;
  console.log(total);
};

// Save the effects code to the set
function track (key) {
    let dep = depsMap.get(key)
    if (!dep) {
        dep = new Set()
        depsMap.set(key, dep)
    }
    dep.add(effect)
    console.log(depsMap)
}

// Call all the effects of a dep
function trigger (key) {
    let dep = depsMap.get(key)
    if (dep) {
        dep.forEach(effect => effect())
    } 
}



// console.log(product.quantity)
track('quantity')
effect() // Effect Initial Values
product.quantity = 10
trigger('quantity')


