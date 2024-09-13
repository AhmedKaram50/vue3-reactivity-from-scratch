let target = null

class Dep {
  constructor() {
    this.subscribers = [];
  }

  subscribe() {
    if (target && this.subscribers.includes(target)) {
      console.log("AHMED")
    } else {
      this.subscribers.push(target)
    }
  }

  notify() {
    // console.log("Notified")
    this.subscribers.forEach(target => typeof target === 'function' ? target() : null)
  }
}

// const v2 = new Dep();

function watcher(func) {
  target = func
  // v2.subscribe()
  target()
  target = null
}

function reactive_vue2(data) {
  Object.keys(data).forEach(key => {
    const dep = new Dep()
  
    let internalValue = data[key]
  
    Object.defineProperty(data, key, {
      get() {
        dep.subscribe()
        return internalValue
      },
  
      set(val) {
        internalValue = val
        dep.notify()
      }
    })
  })

  return data
}


export {
  Dep,
  watcher,
  reactive_vue2
}