let activeEffect = null;

// Contain all the reactive objects as keys and the depsMap as values
const targetMap = new WeakMap();

export function effect(eff) {
  activeEffect = eff;
  activeEffect();
  activeEffect = null;
}

// Save the effects code to the set
function track(target, key) {
  if (activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, (dep = new Set()));
      dep.add(activeEffect);
    }
  }
}

// Call all the effects of a dep
function trigger(target, key) {
  let depsMap = targetMap.get(target);
  if (!depsMap) return;
  let dep = depsMap.get(key);
  if (!dep) return;
  dep.forEach((effect) => effect());
}

export function reactive(target) {
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      // console.log(oldValue, value)
      let result = Reflect.set(target, key, value, receiver);
      if (oldValue != value) {
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}

