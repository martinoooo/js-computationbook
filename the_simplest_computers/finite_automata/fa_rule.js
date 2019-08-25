class FARule {
  // state可能为number，也有可能为数组
  constructor(state, character, next_state) {
    this.state = state;
    this.character = character;
    this.next_state = next_state;
  }

  applies_to(state, character) {
    return isSame(this.state, state) && this.character == character;
  }

  follow() {
    return this.next_state;
  }

  inspect() {
    return `#<FARule ${this.state}:${this.character} --> ${this.next_state}>`;
  }
}

export default FARule;

function isSame(val1, val2) {
  if (typeof val1 === "number" && typeof val2 === "number") {
    return val1 === val2;
  } else {
    return val1.sort().toString() === val2.sort().toString();
  }
}
