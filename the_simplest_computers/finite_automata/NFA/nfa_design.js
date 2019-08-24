import NFA from "./nfa";

class NFADesign {
  constructor(start_state, accept_states, rulebook) {
    this.start_state = start_state;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  accepts(string) {
    const nfa = this.to_nfa();
    return nfa.read_string(string).accepting();
  }

  to_nfa(current_states = [this.start_state]) {
    return new NFA(current_states, this.accept_states, this.rulebook);
  }
}

export default NFADesign;
