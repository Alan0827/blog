---
title: vue双向绑定原理2
date: 2018-05-24 21:10:19
tags: 
  - vue
  - js
categories:
  - 随笔
permalink: /pages/7dfbc0/
sidebar: auto
author: 
  name: Alan0827
  link: https://github.com/Alan0827
---

Object数据我们使用的是JS提供的对象原型上的方法Object.defineProperty，而这个方法是对象原型上的，所以Array无法使用这个方法，所以我们需要对Array型数据设计一套另外的变化侦测机制。

vue中是怎么检测到数组的变化？
首先，整个监测变化的流程是没有大的变化，和我们上一章说的一样。

<!-- more -->

**vue重写了数组原型方法**，使用函数劫持的方式，重写了数组的方法
```
// 源码位置：/src/core/observer/index.js

if (Array.isArray(value)) { // 如果是数组
  if (hasProto) { // 判断是否支持原型链
     protoAugment(value, arrayMethods) // arrayMethods就是改写数组的原型方法
  } else {
     copyAugment(value, arrayMethods, arrayKeys) // 如果没有原型链会走def方法添加__ob__属性
  }
  this.observeArray(value) // 深度监测数组中的每一个元素，遍历一遍数组，调用observe方法进行监测
} else {
  this.walk(value)
}

// 能力检测：判断__proto__是否可用，因为有的浏览器不支持该属性
export const hasProto = '__proto__' in {}

const arrayKeys = Object.getOwnPropertyNames(arrayMethods)

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src: Object) {
  target.__proto__ = src // 让目标的原型链指向src
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target: Object, src: Object, keys: Array<string>) {
  for (let i = 0, l = keys.length; i < l; i++) {
    const key = keys[i]
    def(target, key, src[key])
  }
}

```

```
// 源码位置：/src/core/observer/array.js

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
 
const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
 
// 内部会采用函数劫持的方式，当用户调用这些方法之后，还会调用原数组的方法进行更新数组
methodsToPatch.forEach(function (method) {
  const original = arrayProto[method] // 将原方法拿到
  def(arrayMethods, method, function mutator (...args) { // 然后重新定义这些方法，用户调方法时走的就是这个mutator函数，这个函数还是会调用数组原有的方法
    const result = original.apply(this, args) // 原生的方法
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break // 新增数组的方法push，unshift，splice可以帮我们更新数组中的新增一项
    }
    if (inserted) ob.observeArray(inserted) // 对插入的数据再次进行监测，新增的数据也可能是对象类型
    // observeArray是将数组遍历一遍
    ob.dep.notify() // 通知视图更新
    return result
  })
})
```

拦截器生效以后，当数组数据再发生变化时，我们就可以在拦截器中通知变化了，也就是说现在我们就可以知道数组数据何时发生变化了


**依赖收集**
依赖管理器定义在Observer类中，而我们需要在getter中收集依赖，也就是说我们必须在getter中能够访问到Observer类中的依赖管理器，才能把依赖存进去。

```
function defineReactive (obj,key,val) {
  let childOb = observe(val)
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get(){
      if (childOb) {
        childOb.dep.depend()
      }
      return val;
    },
    set(newVal){
      if(val === newVal){
        return
      }
      val = newVal;
      dep.notify()   // 在setter中通知依赖更新
    }
  })
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 * 尝试为value创建一个0bserver实例，如果创建成功，直接返回新创建的Observer实例。
 * 如果 Value 已经存在一个Observer实例，则直接返回它
 */
export function observe (value, asRootData){
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}
```

**通知依赖**
我们应该在拦截器里通知依赖，要想通知依赖，首先要能访问到依赖。要访问到依赖也不难，因为我们只要能访问到被转化成响应式的数据value即可，因为vaule上的__ob__就是其对应的Observer类实例，有了Observer类实例我们就能访问到它上面的依赖管理器，然后只需调用依赖管理器的dep.notify()方法，让它去通知依赖更新即可

```
methodsToPatch.forEach(function (method) {
  const original = arrayProto[method] // 将原方法拿到
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args) // 原生的方法
    ...
    ob.dep.notify() // 通知视图更新
    return result
  })
})
```

以上基本就完成了Array的变化监测。


**深度监测**

```
export class Observer {
  value: any;
  dep: Dep;

  constructor (value: any) {
    this.value = value
    this.dep = new Dep()
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      const augment = hasProto
        ? protoAugment
        : copyAugment
      augment(value, arrayMethods, arrayKeys)
      this.observeArray(value)   // 将数组中的所有元素都转化为可被侦测的响应式
    } else {
      this.walk(value)
    }
  }

  /**
   * Observe a list of Array items.
   */
  observeArray (items: Array<any>) {
    for (let i = 0, l = items.length; i < l; i++) {
      observe(items[i])
    }
  }
}

export function observe (value, asRootData){
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  let ob
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__
  } else {
    ob = new Observer(value)
  }
  return ob
}

```

在上面代码中，对于Array型数据，调用了observeArray()方法，该方法内部会遍历数组中的每一个元素，然后通过调用observe函数将每一个元素都转化成可侦测的响应式数据。

而对应object数据，在上一篇文章中我们已经在defineReactive函数中进行了递归操作。

<font color="red"> 注意事项：</font>
```
let arr = [1,2]
arr[0] = 5;       // 通过数组下标修改数组中的数据
arr.length = 0    // 通过修改数组长度清空数组
```
我们是通过拦截器实现对数组的监测，我们拦截的是数组上面的方法，但是我们改变数组下标或长度的时候并没有调用原型上的方法，所以上面2种情况是监测不到的。
Vue增加了两个全局API:Vue.set和Vue.delete

---

参考文档：
https://github.com/vuejs/vue/tree/dev/src/core
https://cn.vuejs.org/v2/guide/reactivity.html
https://vue-js.com/learn-vue/start/

















