import Number from "./number";
import Multiply from "./multiply";
import Add from "./add";
import LessThan from "./less_than";
import Variable from "./variable";
import Assign from "./assign";
import If from "./if";
import Boolean from "./boolean";
import DoNothing from "./do_nothing";
import Sequence from "./sequence";
import While from "./while";

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
  }
}

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
