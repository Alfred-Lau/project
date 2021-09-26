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
- 
*/

// 3. 结合 ES6 新语法，用最简单的方式找出数组中的最小值
var arr = [12, 34, 32, 89, 4];

Array.prototype.min = function min() {
    if (!Array.isArray(this)) {
        throw new Error("需要提供一个数组");
    }
    this.sort((a, b) => a > b);
    return this[0];
    // return this.reduce((prev, cur) => (prev > cur ? cur : prev), this[0]);
};

console.log(arr.min());

// 4. 请详细说明 var, let, const 三种声明变量的方式之间的具体差别

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

// 6. 简述 Symbol 类型的用途

// 7. 说说什么是浅拷贝，什么是深拷贝
/* 

- 深拷贝
- 浅拷贝

*/

// 8. 请简述 Typescript 和 JavaScript 之间的关系

// 9. 请谈谈你所认为 Typescript 的优缺点

// 10. 描述引用计数的工作原理和优缺点

// 11. 描述标记整理算法的工作流程

// 12. 描述 V8 中新生代存储区垃圾回收的流程

// 13. 米搜书增量标记算法在何时使用及工作原理
