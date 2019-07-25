import Boolean from "./boolean";

class If {
  constructor(condition, consequence, alternative) {
    this.condition = condition;
    this.consequence = consequence;
    this.alternative = alternative;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return `if ${this.condition} { ${this.consequence} } else { ${
      this.alternative
    } }`;
  }

  evaluate(environment) {
    if (this.condition.evaluate(environment).value === true) {
      return this.consequence.evaluate(environment);
    } else {
      return this.alternative.evaluate(environment);
    }
  }
}

export default If;
