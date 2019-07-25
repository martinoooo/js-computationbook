import Number from "./number";

class Multiply {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return `${this.left} * ${this.right}`;
  }

  evaluate(environment) {
    return new Number(
      this.left.evaluate(environment) * this.right.evaluate(environment)
    );
  }
}

export default Multiply;
