class DoNothing {
  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return "do-nothing";
  }

  evaluate(environment) {
    return environment;
  }
}

export default DoNothing;
