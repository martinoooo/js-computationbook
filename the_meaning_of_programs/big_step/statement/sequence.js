import DoNothing from "./do_nothing";

class Sequence {
  constructor(first, second) {
    this.first = first;
    this.second = second;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return `${this.first} ; ${this.second} `;
  }

  evaluate(environment) {
    return this.second.evaluate(this.first.evaluate(environment));
  }
}

export default Sequence;
