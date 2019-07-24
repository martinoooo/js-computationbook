class Variable {
  constructor(name) {
    this.name = name;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return this.name;
  }

  reducible() {
    return true;
  }

  reduce(environment) {
    return environment[this.name];
  }
}

export default Variable;
