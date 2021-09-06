// 基于以下代码完成后面的四个练习

const fp = require("lodash/fp");

const cars = [
    {
        name: "Ferrari FF",
        horsepower: 660,
        dollar_value: 700000,
        in_stock: true,
    },
    {
        name: "Spyker",
        horsepower: 650,
        dollar_value: 648000,
        in_stock: false,
    },
    {
        name: "Jaguar XKR-S",
        horsepower: 550,
        dollar_value: 132000,
        in_stock: false,
    },
    {
        name: "Audi R8",
        horsepower: 525,
        dollar_value: 114200,
        in_stock: false,
    },
    {
        name: "Aston Martin One-77",
        horsepower: 750,
        dollar_value: 1850000,
        in_stock: true,
    },
    {
        name: "Pagani Huayra",
        horsepower: 700,
        dollar_value: 1300000,
        in_stock: false,
    },
];

// 1. 使用 fp.flowRight 重新实现下面的函数
let isLastInStock = function (cars) {
    let last_car = fp.last(cars);
    return fp.prop("in_stock", last_car);
};
console.log("question:", isLastInStock(cars));

function getLastCar(cars) {
    return fp.last(cars);
}

function getInStockProp(last_car) {
    return fp.prop("in_stock", last_car);
}

console.log("answer:", fp.flowRight(getInStockProp, getLastCar)(cars));

// 2. 使用fp.flowRight, fp.prop, fp.first 获取第一个car的name

function getNameProp(first_car) {
    return fp.prop("name", first_car);
}
const f = fp.flowRight(getNameProp, fp.first);
console.log("第一辆car的name 是：", f(cars));

// 3. 使用帮助函数 _average 重构 averageDollarValue，使用函数组合的方式的实现
let _average = function (xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length;
};

let averageDollarValue = function (cars) {
    let dollar_values = fp.map(function (car) {
        return car.dollar_value;
    }, cars);
    return _average(dollar_values);
};

console.log(averageDollarValue(cars));

// 4. 使用flowRight写一个sanitizeNames()函数，返回一个下划线链接的小写字符串，把数组中的name 转化成这种形式
let _undersorce = fp.replace(/\W+/g, "_");

function getNameArray(car) {
    return fp.prop("name", car);
}

// function debug(value) {
//     console.log(value);
//     return value;
// }
const snitizeName = fp.flowRight(
    fp.map(_undersorce),
    fp.map(fp.lowerCase),
    fp.map(getNameArray)
);

console.log(snitizeName(cars));
