// 基于下面的代码，完成后面的四个练习

class Container {
    static of(value) {
        return new Container(value);
    }

    constructor(value) {
        this._value = value;
    }

    map(fn) {
        return Container.of(fn(this._value));
    }
}

class MayBe {
    static of(x) {
        return new MayBe(x);
    }
    isNothing() {
        return this._value === null || this._value === undefined;
    }
    constructor(value) {
        this._value = value;
    }

    map(fn) {
        return this.isNothing() ? this : MayBe.of(fn(this._value));
    }
}

module.exports = { Container, MayBe };
