import Pattern from "./pattern";

class Repeat extends Pattern {
  constructor(pattern) {
    super();
    this.pattern = pattern;
  }

  get to_s() {
    return this.pattern.bracket(this.precedence) + "*";
  }

  get precedence() {
    return 2;
  }
}

export default Repeat;
