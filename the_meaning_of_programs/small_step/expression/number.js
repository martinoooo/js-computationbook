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

  // Number总是表示一个值，不能规约成任何其它东西了
  reducible() {
    return false;
  }
}

export default Number;
