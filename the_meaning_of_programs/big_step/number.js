class Number {
  constructor(value) {
    this.value = value;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return this.value;
  }

  evaluate(environment) {
    return this;
  }
}

export default Number;
