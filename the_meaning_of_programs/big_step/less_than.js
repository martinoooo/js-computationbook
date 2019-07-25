import Boolean from "./boolean";

class LessThan {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return `${this.left} < ${this.right}`;
  }

  evaluate(environment) {
    return new Boolean(
      this.left.evaluate(environment) < this.right.evaluate(environment)
    );
  }
}

export default LessThan;
