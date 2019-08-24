import DFA from "./dfa";

class DFADesign {
  constructor(start_state, accept_states, rulebook) {
    this.start_state = start_state;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  to_dfa() {
    return new DFA(this.start_state, this.accept_states, this.rulebook);
  }

  accepts(string) {
    const dfa = this.to_dfa();
    return dfa.read_string(string).accepting();
  }
}

export default DFADesign;
