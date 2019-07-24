class DoNothing {
  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return "do-nothing";
  }

  reducible() {
    return false;
  }
}

export default DoNothing;
