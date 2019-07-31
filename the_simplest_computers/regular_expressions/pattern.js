class Pattern {
  bracket(outer_precedence) {
    if (this.precedence < outer_precedence) {
      return "(" + this.to_s + ")";
    } else {
      return this.to_s;
    }
  }

  inspect() {
    return `/${this.to_s}/`;
  }

  matches(string) {
    return this.to_nfa_design().accepts(string);
  }
}

export default Pattern;
