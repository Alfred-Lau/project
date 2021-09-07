// 1.使用 fp.add(x,y)和 fp.map(f,x)创建一个能让functor里的值增加的函数 ex1
const fp = require("lodash/fp");
const { MayBe, Container } = require("./support");

let maybe = MayBe.of([5, 6, 1]);
// TODO：
let ex1 = () => {};

// 2. 实现一个函数 ex2，能够使用 fp.first 获取列表的第一个元素
let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);
let ex2 = () => {
    return xs.map(fp.first)._value;
};
console.log("2.", ex2());

// 3. 实现一个函数ex3,使用 safeProp 和 fp.first 找到user 的名字的首字母
let safeProp = fp.curry(function (x, o) {
    return MayBe.of(o[x]);
});

let user = { id: 2, name: "Albert" };

let ex3 = () => {
    return safeProp("name")(user).map(fp.first)._value;
};
console.log("3.", ex3());

// 4. 使用MayBe 重写 ex4 ，不要有 if 语句
let ex4 = function (n) {
    if (n) {
        return parseInt(n);
    }
};

let refactorEx4 = function (n) {
    const maybe = MayBe.of(n);
    return maybe.map(parseInt)._value;
};

console.log("4.", refactorEx4("100"));
console.log("4.", refactorEx4());
