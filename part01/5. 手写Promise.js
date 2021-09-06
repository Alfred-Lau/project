function customePromsie(resplve, reject) {
    this.resolveFns = [];
    this.rejectFns = [];
    this.status = "pedding";
    this.then = function (resolveFn, rejectFn) {
        console.log("hello,then");
        if (resolveFn) {
            this.resolveFns.push(resolveFn);
        }

        if (rejectFn) {
            this.rejectFns.push(rejectFn);
        }
        return this;
    };

    this.catch = function (funct) {
        console.log("hello,catch");
        return this;
    };

    this.finally = function (funct) {
        console.log("hello,finally");
        return this;
    };
}

customePromsie.resolve = function (data) {
    console.log("i am resolved", data);
};
customePromsie.reject = function (resolveFn, rejectFn) {};
customePromsie.all = function (resolveFn, rejectFn) {};
customePromsie.race = function (resolveFn, rejectFn) {};

const pp = new customePromsie((resolve, reject) => {
    setTimeout(() => {
        resolve("hello,world");
    }, 1000);
});

pp.then((resolve, reject) => customePromsie.resolve(100))
    .catch((e) => console.log(e))
    .finally(() => console.log("i an finally"));
