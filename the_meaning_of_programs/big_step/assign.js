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

  evaluate(environment) {
    return Object.assign(environment, {
      [this.name]: this.expression.evaluate(environment)
    });
  }
}

export default Assign;
