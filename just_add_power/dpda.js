class DPDA {
  constructor(current_configuration, accept_states, rulebook) {
    this.local_current_configuration = current_configuration;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  get current_configuration() {
    return this.rulebook.follow_free_moves(this.local_current_configuration);
  }

  accepting() {
    return this.accept_states.includes(this.current_configuration.state);
  }

  read_character(character) {
    this.local_current_configuration = this.next_configuration(character);
  }

  read_string(string) {
    let chars = string.split("");
    for (let i = 0; i < chars.length; i++) {
      if (this.isStuck()) {
        break;
      }
      this.read_character(chars[i]);
    }
    return this;
  }

  next_configuration(character) {
    if (this.rulebook.applies_to(this.current_configuration, character)) {
      return this.rulebook.next_configuration(
        this.current_configuration,
        character
      );
    } else {
      return this.current_configuration.stuck;
    }
  }

  isStuck() {
    return this.current_configuration.isStuck();
  }
}

export default DPDA;
