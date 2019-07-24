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

  reducible() {
    return false;
  }
}

export default Number;
