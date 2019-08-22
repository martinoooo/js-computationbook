class DTM {
  constructor(current_configuration, accept_states, rulebook) {
    this.current_configuration = current_configuration;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  accepting() {
    return this.accept_states.includes(this.current_configuration.state);
  }

  step() {
    this.current_configuration = this.rulebook.next_configuration(
      this.current_configuration
    );
  }

  run() {
    while (!this.accepting() && !this.stuck()) {
      this.step();
    }
  }

  stuck() {
    return (
      !this.accepting() && !this.rulebook.applies_to(this.current_configuration)
    );
  }
}

export default DTM;
