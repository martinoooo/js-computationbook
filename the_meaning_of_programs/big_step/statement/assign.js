import DoNothing from "./do_nothing";

class Assign {
  constructor(name, expression) {
    this.name = name;
    this.expression = expression;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return `${this.name} = ${this.expression}`;
  }

  // 对表达式求值，并返回一个包含一个结果值的更新了的环境
  evaluate(environment) {
    return Object.assign(environment, {
      [this.name]: this.expression.evaluate(environment)
    });
  }
}

export default Assign;
