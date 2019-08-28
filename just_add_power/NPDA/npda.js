class NPDA {
  constructor(current_configurations, accept_states, rulebook) {
    this._current_configurations = current_configurations;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  get current_configurations() {
    return this.rulebook.follow_free_moves(this._current_configurations);
  }

  accepting() {
    const filter = this.current_configurations.filter(config => {
      return this.accept_states.includes(config.state);
    });
    return filter.length !== 0;
  }

  read_character(character) {
    this._current_configurations = this.rulebook.next_configurations(
      this.current_configurations,
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

export default NPDA;
