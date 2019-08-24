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

  // Multiply表达式总是能规约的
  reducible() {
    return true;
  }

  // 对表达式进行规约
  reduce(environment) {
    if (this.left.reducible()) {
      return new Multiply(this.left.reduce(environment), this.right);
    } else if (this.right.reducible()) {
      return new Multiply(this.left, this.right.reduce(environment));
    } else {
      return new Number(this.left * this.right);
    }
  }
}

export default Multiply;
