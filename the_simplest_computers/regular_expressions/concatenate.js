import Pattern from "./pattern";

class Concatenate extends Pattern {
  constructor(first, second) {
    super();
    this.first = first;
    this.second = second;
  }

  get to_s() {
    return [this.first, this.second]
      .map(pattern => {
        return pattern.bracket(this.precedence);
      })
      .join("");
  }

  get precedence() {
    return 1;
  }
}

export default Concatenate;
