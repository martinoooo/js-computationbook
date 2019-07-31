import Pattern from "./pattern";
import FARule from "../finite_automata/fa_rule";
import NFARulebook from "../finite_automata/nfa_rulebook";
import NFADesign from "../finite_automata/nfa_design";

class Literal extends Pattern {
  constructor(character) {
    super();
    this.character = character;
  }

  get to_s() {
    return this.character;
  }

  get precedence() {
    return 3;
  }

  to_nfa_design() {
    const start_state = "";
    const accept_state = this.character;
    const rule = new FARule(start_state, this.character, accept_state);
    const rulebook = new NFARulebook([rule]);

    return new NFADesign(start_state, [accept_state], rulebook);
  }
}

export default Literal;
