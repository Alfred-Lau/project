function MyPromise(executor) {
    this.status = "pending";
    this.value = undefined;
    this.resolveFns = [];
    this.rejectFns = [];
    const self = this;
    function resolve(value) {
        // 性能考虑，错误判断，直接返回

        if (self.status !== "pending") return;

        self.status = "fulfilled";
        self.value = value;
        while (self.resolveFns.length) self.resolveFns.shift()();
    }
    function reject(reason) {
        // 性能考虑，错误判断，直接返回
        if (self.status !== "pending") return;
        self.status = "rejected";
        self.value = reason;
        while (self.rejectFns.length) self.rejectFns.shift()();
    }

    try {
        executor(resolve, reject);
    } catch (error) {
        reject("执行器执行出错");
    }

    function then(successCbs, failedCbs) {
        successCbs = successCbs ? successCbs : (value) => value;
        failedCbs = failedCbs
            ? failedCbs
            : (reason) => {
                  throw new Error(reason);
              };

        let promise = new MyPromise((resolve, reject) => {
            if (self.status === "fulfilled") {
                setTimeout(() => {
                    try {
                        let result = successCbs(self.value);
                        resolvePromise(promise, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            } else if (self.status === "rejected") {
                setTimeout(() => {
                    try {
                        let result = failedCbs(self.value);

                        resolvePromise(promise, result, resolve, reject);
                    } catch (error) {
                        reject(error);
                    }
                }, 0);
            } else {
                setTimeout(() => {
                    self.resolveFns.push(() => {
                        setTimeout(() => {
                            try {
                                let result = successCbs(self.value);
                                resolvePromise(
                                    promise,
                                    result,
                                    resolve,
                                    reject
                                );
                            } catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });
                    self.rejectFns.push(() => {
                        setTimeout(() => {
                            try {
                                let result = failedCbs(self.value);
                                resolvePromise(
                                    promise,
                                    result,
                                    resolve,
                                    reject
                                );
                            } catch (error) {
                                reject(error);
                            }
                        }, 0);
                    });
                }, 0);
            }
        });
        return promise;
    }

    this.then = then;
    this.finally = function (callback) {
        return this.then(
            (value) => MyPromise.resolve(callback()).then(() => value),
            (reason) =>
                MyPromise.resolve(callback()).then(() => {
                    throw reason;
                })
        );
    };
    this.catch = function (failedCbs) {
        return this.then(undefined, failedCbs);
    };
}

MyPromise.resolve = function (value) {
    // 处理resolve 一个promsie的情况
    if (value instanceof MyPromise) return value;
    return new MyPromise((resolve) => resolve(value));
};
MyPromise.all = function (cbArr) {
    const result = [];
    let index = 0;

    return new MyPromise((resolve, reject) => {
        function collect(key, val) {
            result[key] = val;
            index++;
            if (index === cbArr.length) {
                resolve(result);
            }
        }
        for (let i = 0; i < cbArr.length; i++) {
            const cb = cbArr[i];
            if (cb instanceof MyPromise) {
                cb.then(
                    (value) => collect(i, value),
                    (reason) => reject(reason)
                );
            } else {
                collect(i, cb);
            }
        }
    });
};

function resolvePromise(promise, result, resolve, reject) {
    // 避免递归调用
    if (result === promise) {
        return reject(
            new TypeError("Chaining cycle detected for promise #<Promise>")
        );
    }

    if (result instanceof MyPromise) {
        result.then(resolve, reject);
    } else {
        // 普通值
        resolve(result);
    }
}
module.exports = MyPromise;

/* 
1. 基本结构
2. 链式调用
3. then 函数对域默认参数的支持
4. then 函数的透传
5. 静态方法

执行器改变状态，then 函数使用状态


*/
