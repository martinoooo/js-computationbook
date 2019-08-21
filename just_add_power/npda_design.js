import Stack from "./stack";
import PDAConfiguration from "./pda_configuration";
import NPDA from "./npda";

class NPDADesign {
  constructor(start_state, bottom_character, accept_states, rulebook) {
    this.start_state = start_state;
    this.bottom_character = bottom_character;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  accepts(string) {
    const npda = this.to_npda();
    return npda.read_string(string).accepting();
  }

  to_npda() {
    const start_stack = new Stack([this.bottom_character]);
    const start_configuration = new PDAConfiguration(
      this.start_state,
      start_stack
    );
    return new NPDA([start_configuration], this.accept_states, this.rulebook);
  }
}

export default NPDADesign;
