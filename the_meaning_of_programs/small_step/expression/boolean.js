class Boolean {
  constructor(value) {
    this.value = value;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return this.value;
  }

  // Boolean总是表示一个值，不能规约成任何其它东西了
  reducible() {
    return false;
  }
}

export default Boolean;
