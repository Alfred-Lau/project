// 1. 将下面的异步代码使用 Promsie 的方式改进

setTimeout(function () {
    var a = "hello ";
    setTimeout(function () {
        var b = "lagou ";
        setTimeout(function () {
            var c = "i love u";
            console.log(a + b + c);
        }, 10);
    }, 10);
}, 10);

// 休止函数
const sleep = (time = 10) =>
    new Promise((resolve) => setTimeout(resolve, time));
// 执行函数
function print() {
    return new Promise(() => {
        var a = "hello ";
        sleep().then(() => {
            var b = "lagou ";
            sleep().then(() => {
                var c = "i love u";
                console.log(a + b + c);
            });
        });
    });
}

sleep().then(print());
