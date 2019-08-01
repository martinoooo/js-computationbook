import Pattern from "./pattern";
import NFARulebook from "../finite_automata/nfa_rulebook";
import NFADesign from "../finite_automata/nfa_design";
import uniqId from "./uniqId";

class Empty extends Pattern {
  get to_s() {
    return "";
  }

  get precedence() {
    return 3;
  }

  to_nfa_design() {
    const start_state = uniqId();
    const accept_states = [start_state];
    const rulebook = new NFARulebook([]);
    return new NFADesign(start_state, accept_states, rulebook);
  }
}

export default Empty;
