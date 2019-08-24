import Boolean from "../expression/boolean";

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

  // 会堆积很多对evaluate的嵌套调用，知道条件最后为false然后返回最后的环境
  evaluate(environment) {
    if (
      this.condition.evaluate(environment).value === new Boolean(true).value
    ) {
      return this.evaluate(this.body.evaluate(environment));
    } else {
      return environment;
    }
  }
}

export default While;
