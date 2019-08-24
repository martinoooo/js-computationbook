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

  reducible() {
    return true;
  }

  reduce(environment) {
    if (this.left.reducible()) {
      return new LessThan(this.left.reduce(environment), this.right);
    } else if (this.right.reducible()) {
      return new LessThan(this.left, this.right.reduce(environment));
    } else {
      return new Boolean(this.left < this.right);
    }
  }
}

export default LessThan;
