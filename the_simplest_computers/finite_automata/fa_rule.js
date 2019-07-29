class FARule {
  constructor(state, character, next_state) {
    this.state = state;
    this.character = character;
    this.next_state = next_state;
  }

  applies_to(state, character) {
    return this.state == state && this.character == character;
  }

  follow() {
    return this.next_state;
  }

  inspect() {
    return `#<FARule ${this.state}:${this.character} --> ${this.next_state}>`;
  }
}

export default FARule;
