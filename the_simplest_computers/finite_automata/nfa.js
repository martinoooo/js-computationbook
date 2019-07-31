class NFA {
  constructor(current_states, accept_states, rulebook) {
    this.accept_states = accept_states;
    this.rulebook = rulebook;
    this.current_states = this.rulebook.follow_free_moves(current_states);
  }

  // accept_states里面是否包含current_states里面的数字
  accepting() {
    const filter = this.current_states.filter(v =>
      this.accept_states.includes(v)
    );
    return filter.length !== 0;
  }

  read_character(character) {
    this.current_states = this.rulebook.next_states(
      this.current_states,
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

export default NFA;
