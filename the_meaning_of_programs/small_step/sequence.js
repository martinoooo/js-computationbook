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

  reducible() {
    return true;
  }

  reduce(environment) {
    if (this.first instanceof DoNothing) {
      return [this.second, environment];
    } else {
      const [reduced_first, reduced_environment] = this.first.reduce(
        environment
      );
      return [new Sequence(reduced_first, this.second), reduced_environment];
    }
  }
}

export default Sequence;
