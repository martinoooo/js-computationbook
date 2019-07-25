class While {
  constructor(condition, body) {
    this.condition = condition;
    this.body = body;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return `while (${this.condition}) { ${this.body} } `;
  }

  evaluate(environment) {
    if (this.condition.evaluate(environment).value === true) {
      return this.evaluate(this.body.evaluate(environment));
    } else {
      return environment;
    }
  }
}

export default While;
