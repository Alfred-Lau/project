// 1. 请说出下列最终的执行结果，并解释为什么
var a = [];
for (var i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}

a[6](); // 10

/* 
原因:
- a[6] 保存的是函数地址，会在赋值的时候直接开辟存储空间
- 函数中的i 变量的作用域是 window【浏览器宿主环境】
- for 循环对 i 变量的修改会直接生效
- 函数调用的时候输出的i 变量为全局作用域的i变量，这个时候i已经进行了最后一次的i++，为10

*/

// 2. 说出下列最终的执行结果，并解释为什么
var tmp = 123;

if (true) {
    // console.log(tmp); // 报错，不能在声明前使用
    let tmp;
}

/* 
原因：
- 只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
- 上面代码中，存在全局变量tmp，但是块级作用域内let又声明了一个局部变量tmp，导致后者绑定这个块级作用域，所以在let声明变量前，对tmp赋值会报错。；
- ES6 规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。
- 在代码块内，使用let命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称 TDZ）。

*/

// 3. 结合 ES6 新语法，用最简单的方式找出数组中的最小值
var arr = [12, 34, 32, 89, 4];

Array.prototype.min = function min() {
    if (!Array.isArray(this)) {
        throw new Error("需要提供一个数组");
    }
    return this.reduce((prev, cur) => (prev > cur ? cur : prev), this[0]);
};

console.log(arr.min());

// 4. 请详细说明 var, let, const 三种声明变量的方式之间的具体差别
/* 
差别：
- var 声明是全局作用域或函数作用域，而 let 和 const 是块作用域。 
- var 变量可以在其范围内更新和重新声明； let 变量可以被更新但不能重新声明； const 变量既不能更新也不能重新声明。
- 块级作用域就是通过词法环境的栈结构来实现的，而变量提升是通过变量环境来实现，通过这两者的结合，JavaScript 引擎也就同时支持了变量提升和块级作用域了。
- 函数内部通过 var 声明的变量，在编译阶段全都被存放到变量环境里面了。通过 let 声明的变量，在编译阶段会被存放到词法环境（Lexical Environment）中
*/

// 5. 说出下列最终的执行结果，并解释为什么
var a = 10;
var obj = {
    a: 20,
    fn() {
        setTimeout(() => {
            console.log(this.a);
        });

        // setTimeout(function () {
        //     console.log(this.a);
        // });// 10
    },
};
obj.fn(); // 20

/* 
原因：
- 箭头函数定义的时候绑定 this 上下文，为对象obj，调用的时候 为20
*/

// 6. 简述
/* 
Symbol 类型的用途
- 应用场景1：使用Symbol来作为对象属性名(key)
  let obj = {
   [Symbol('name')]: '拉勾教育',
   age: 18,
   title: 'Engineer'
  }
- 应用场景2：使用Symbol来替代常量
  const TYPE_AUDIO = Symbol()
  const TYPE_VIDEO = Symbol()
  const TYPE_IMAGE = Symbol()
- 应用场景3：使用Symbol定义类的私有属性/方法
  利用 Symbol以及模块化机制，可以实现类的私有属性和方法
- 应用场景4：注册和获取全局Symbol
  通常情况下，我们在一个浏览器窗口中（window），使用Symbol()函数来定义和Symbol实例就足够了。但是，如果你的应用涉及到多个window（最典型的就是页面中使用了<iframe>），并需要这些window中使用的某些Symbol是同一个，那就不能使用Symbol()函数了，因为用它在不同window中创建的Symbol实例总是唯一的，而我们需要的是在所有这些window环境下保持一个共享的Symbol。这种情况下，我们就需要使用另一个API来创建或获取Symbol，那就是Symbol.for()，它可以注册或获取一个window间全局的Symbol实例：

  var symbolFor = Symbol.for;
  REACT_ELEMENT_TYPE = symbolFor('react.element');
  REACT_PORTAL_TYPE = symbolFor('react.portal');

  这样一个Symbol不光在单个window中是唯一的，在多个相关window间也是唯一的了。

*/

// 7. 说说什么是浅拷贝，什么是深拷贝
/* 
- 注意 赋值 和 拷贝的区别
- 深拷贝和浅拷贝是只针对Object和Array这样的引用数据类型的
- 浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。但深拷贝会另外创造一个一模一样的对象，新对象跟原对象不共享内存，修改新对象不会改到原对象。
- 参考链接：https://segmentfault.com/a/1190000018874254

*/

// 8. 请简述 Typescript 和 JavaScript 之间的关系
/* 
- ts 是 js 的超集
- TypeScript是真面向对象，增加了静态类型，类，模块，接口和类型注解。
- typescript基于javascript添加了不少特性：
  1、类型批注、编译时类型检查
  2、类型推断
  3、类型擦除
  4、接口
  5、枚举
  6、混入
  7、泛型编程
  8、命名空间
  9、元组
  10、Await
  11、类（typescript和javascript的一个不同点就是typescript是基于类的面向对象编程，js 是基于原型链）
  12、模块
  13、lambda函数的箭头语法
  14、可选参数、默认参数

*/

// 9. 请谈谈你所认为 Typescript 的优缺点
/* 

优点：更加符合业务实践，更加规范的面向对象；大型项目后期易于维护

缺点：上手成本高

*/

// 10. 描述引用计数的工作原理和优缺点

/* 

工作原理
- 设置引用数，判断当前引用数是否为0
- 引用关系改变时修改引用数字
- 引用数字为0时立即回收

优缺点：
- 可以即时回收垃圾对象
- 减少程序卡顿时间
- 无法回收循环引用的对象
- 资源消耗较大
*/

// 11. 描述标记整理算法的工作流程

/* 

工作流程
- 遍历所有对象找标记活动对象
- 执行整理，移动对象位置
- 清除没有标记对象的位置
- 回收相应的空间
*/

// 12. 描述 V8 中新生代存储区垃圾回收的流程

/* 

新生代存储区垃圾回收的实现流程
- 回收过程采用复制算法 + 标记整理
- 新生代内存氛围两个等大小空间
- 使用空间为 From， 空闲空间为 To
- 活动对象存储于 From 空间
- 标记整理后蒋活动对象拷贝至 To
- From 和 To 交换空间完成释放


回收细节说明
- 拷贝过程中可能出现晋升
- 晋升就是将新生代对象移动到老生代
- 一轮GC 还存活的新生代需要晋升
- TO 空间的使用率超过 25%

*/

// 13. 描述增量标记算法在何时使用及工作原理

/* 

增量标记是在老生代对象回收中进行效率优化的一个操作。因为当进行垃圾回收操作的时候会阻塞程序的执行，所以在老生代中会在程序执行的空档期执行回收操作。所谓的增量标记指的是将当前一整段的垃圾回收操作，分成多个小步组合着去完成。实现垃圾回收与程序执行交替完成。
*/

/* 

Symbol 备注：

Symbol类型的key是不能通过Object.keys()或者for...in来枚举的，它未被包含在对象自身的属性名集合(property names)之中。所以，利用该特性，我们可以把一些不需要对外操作和访问的属性使用Symbol来定义。

也正因为这样一个特性，当使用JSON.stringify()将对象转换成JSON字符串的时候，Symbol属性也会被排除在输出内容之外：

JSON.stringify(obj)  // {"age":18,"title":"Engineer"}
我们可以利用这一特点来更好的设计我们的数据对象，让“对内操作”和“对外选择性输出”变得更加优雅。

然而，这样的话，我们就没办法获取以Symbol方式定义的对象属性了么？非也。还是会有一些专门针对Symbol的API，比如：

// 使用Object的API
Object.getOwnPropertySymbols(obj) // [Symbol(name)]

// 使用新增的反射API
Reflect.ownKeys(obj) // [Symbol(name), 'age', 'title']



*/
