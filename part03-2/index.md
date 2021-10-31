# homework

一、简答题
1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如何把新增成员设置成响应式数据，它的内部原理是什么。

```js

let vm = new Vue({
el: '#el'
data: {
o: 'object',
dog: {}
},
method: {
clickHandler () {
// 该 name 属性是否是响应式的
this.dog.name = 'Trump'
}
}
})

```

答案：
不是。2.x 的 版本中，通过 Vue.set()，或者 this.$set(target, key ,val) 来添加新的响应式对象
内部原理是：

```js
//  vue 2.6.x 中 set 的实现
export function set(target: Array<any> | Object, key: any, val: any): any {
  if (
    process.env.NODE_ENV !== "production" &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(
      `Cannot set reactive property on undefined, null, or primitive value: ${(target: any)}`
    );
  }
  //  数组设置
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val;
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val;
  }
  const ob = (target: any).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== "production" &&
      warn(
        "Avoid adding reactive properties to a Vue instance or its root $data " +
          "at runtime - declare it upfront in the data option."
      );
    return val;
  }
  if (!ob) {
    target[key] = val;
    return val;
  }
  // 针对设置的部分重新进行 响应式绑定
  defineReactive(ob.value, key, val);
  ob.dep.notify();
  return val;
}
```

2、请简述 Diff 算法的执行过程

二、编程题
1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

答案：修改文件 index.html js/vue.js js/compiler.js
