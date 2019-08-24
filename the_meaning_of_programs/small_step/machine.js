import Number from "./expression/number";
import Multiply from "./expression/multiply";
import Add from "./expression/add";
import LessThan from "./expression/less_than";
import Variable from "./expression/variable";
import Assign from "./statement/assign";
import If from "./statement/if";
import Boolean from "./expression/boolean";
import DoNothing from "./statement/do_nothing";
import Sequence from "./statement/sequence";
import While from "./statement/while";

class Statement_Machine {
  constructor(expression, environment) {
    this.expression = expression;
    this.environment = environment;
  }

  step() {
    [this.expression, this.environment] = this.expression.reduce(
      this.environment
    );
  }

  run() {
    while (this.expression.reducible()) {
      console.log([this.expression, this.environment]);
      this.step();
    }
    console.log([this.expression, this.environment]);
    return [this.expression, this.environment];
  }
}

class Expression_Machine {
  constructor(expression, environment) {
    this.expression = expression;
    this.environment = environment;
  }

  step() {
    this.expression = this.expression.reduce(this.environment);
  }

  run() {
    while (this.expression.reducible()) {
      console.log(this.expression);
      this.step();
    }
    console.log(this.expression);
    return this.expression;
  }
}

// machine机器，对表达式进行自动规约，传入表达式和当前环境
function Machine(syntax, args) {
  if (
    syntax instanceof Add ||
    syntax instanceof Boolean ||
    syntax instanceof LessThan ||
    syntax instanceof Multiply ||
    syntax instanceof Number ||
    syntax instanceof Variable
  ) {
    return new Expression_Machine(syntax, args);
  } else if (
    syntax instanceof Assign ||
    syntax instanceof DoNothing ||
    syntax instanceof If ||
    syntax instanceof Sequence ||
    syntax instanceof While
  ) {
    return new Statement_Machine(syntax, args);
  }
}

export default Machine;
