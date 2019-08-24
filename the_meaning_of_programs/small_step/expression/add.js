import Number from "./number";

class Add {
  constructor(left, right) {
    this.left = left;
    this.right = right;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return `${this.left} + ${this.right}`;
  }

  // Add表达式总是能规约的
  reducible() {
    return true;
  }

  // 对表达式进行规约
  reduce(environment) {
    if (this.left.reducible()) {
      return new Add(this.left.reduce(environment), this.right);
    } else if (this.right.reducible()) {
      return new Add(this.left, this.right.reduce(environment));
    } else {
      // this.left为object，调用 '+'运算会调用toString方法
      return new Number(this.left + this.right);
    }
  }
}

export default Add;
