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
    if (!dep) depsMap.set(key, (dep = new Set()));
    dep.add(activeEffect);
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

export function reactive(target) { // Reactive Vue 3
  const handler = {
    get(target, key, receiver) {
      let result = Reflect.get(target, key, receiver);
      track(target, key);
      return result;
    },
    set(target, key, value, receiver) {
      let oldValue = target[key];
      let result = Reflect.set(target, key, value, receiver);
      if (oldValue != value) {
        trigger(target, key);
      }
      return result;
    },
  };

  return new Proxy(target, handler);
}

export function reactive_vue2(target) { // Reactive Vue 2
  Object.keys(target).forEach(key => {
    let value = target[key]
    Object.defineProperty(target, key, {
      get() {
        track(target, key);
        return value;
      },
      set(newValue) {
        let oldValue = target[key];
        value = newValue
        if (oldValue != newValue) {
          trigger(target, key);
        }
      }
    })
  })

  return target
}

export function ref(raw) {
  const r = {
    get value() {
      track(r, "value");
      return raw;
    },
    set value(val) {
      raw = val;
      trigger(r, "value");
    },
  };
  return r;
}
