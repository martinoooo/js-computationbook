import If from "./if";
import Sequence from "./sequence";
import DoNothing from "./do_nothing";

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

  reducible() {
    return true;
  }

  reduce(environment) {
    return [
      new If(this.condition, new Sequence(this.body, this), new DoNothing()),
      environment
    ];
  }
}

export default While;
