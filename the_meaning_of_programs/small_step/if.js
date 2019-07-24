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

  reducible() {
    return true;
  }

  reduce(environment) {
    if (this.condition.reducible()) {
      return [
        new If(
          this.condition.reduce(environment),
          this.consequence,
          this.alternative
        ),
        environment
      ];
    } else {
      if (this.condition.value === new Boolean(true).value) {
        return [this.consequence, environment];
      } else {
        return [this.alternative, environment];
      }
    }
  }
}

export default If;
