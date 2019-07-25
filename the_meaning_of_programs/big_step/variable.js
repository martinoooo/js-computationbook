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

  evaluate(environment) {
    return environment[this.name];
  }
}

export default Variable;
