class Machine {
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

export default Machine;
