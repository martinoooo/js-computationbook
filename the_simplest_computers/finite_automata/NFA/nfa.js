class NFA {
  constructor(current_states, accept_states, rulebook) {
    this.accept_states = accept_states;
    this.rulebook = rulebook;
    this._current_states = current_states;
  }

  get current_states() {
    return this.rulebook.follow_free_moves(this._current_states);
  }

  // 如果current_states里有一个是接受状态，那么就说它处于接受状态
  // accept_states里面是否包含current_states里面的数字
  accepting() {
    const filter = this.current_states.filter(v =>
      this.accept_states.includes(v)
    );
    return filter.length !== 0;
  }

  read_character(character) {
    this._current_states = this.rulebook.next_states(
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
