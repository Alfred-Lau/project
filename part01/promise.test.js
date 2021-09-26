const MyPromise = require("./promise");

const promise = new MyPromise((resolve, reject) => {
    setTimeout(function () {
        resolve("p1");
    }, 2000);
});

// 测试 then 方法的回调函数
promise
    .then(
        function resolveFn(value) {
            return new MyPromise(function (resolve, reject) {
                resolve(value);
            });
        },
        function rejectFn(reason) {
            throw new Error(reason);
        }
    )
    .then((value) => console.log("我被成功执行了", value))
    .finally(() => console.log("我总是要被执行的"))
    .catch((e) => console.log(e.message));

MyPromise.all([
    1,
    2,
    new MyPromise(function (resolve, reject) {
        setTimeout(() => {
            resolve(100);
        }, 1000);
    }),
    4,
    5,
]).then((value) => console.log(value));
