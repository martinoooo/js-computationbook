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

  reducible() {
    return true;
  }

  reduce(environment) {
    if (this.expression.reducible()) {
      return [
        new Assign(this.name, this.expression.reduce(environment)),
        environment
      ];
    } else {
      return [
        new DoNothing(),
        { ...environment, [this.name]: this.expression }
      ];
    }
  }
}

export default Assign;
