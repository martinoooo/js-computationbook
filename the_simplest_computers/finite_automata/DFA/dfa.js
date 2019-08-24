class DFA {
  constructor(current_state, accept_states, rulebook) {
    this.current_state = current_state;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  accepting() {
    return this.accept_states.includes(this.current_state);
  }

  read_character(character) {
    this.current_state = this.rulebook.next_state(
      this.current_state,
      character
    );
    return this;
  }

  read_string(string) {
    const arr = string.split("");
    arr.forEach(character => {
      this.read_character(character);
    });
    return this;
  }
}

export default DFA;
