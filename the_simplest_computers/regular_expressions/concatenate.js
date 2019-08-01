import Pattern from "./pattern";
import NFARulebook from "../finite_automata/nfa_rulebook";
import FARule from "../finite_automata/fa_rule";
import NFADesign from "../finite_automata/nfa_design";

class Concatenate extends Pattern {
  constructor(first, second) {
    super();
    this.first = first;
    this.second = second;
  }

  get to_s() {
    return [this.first, this.second]
      .map(pattern => {
        return pattern.bracket(this.precedence);
      })
      .join("");
  }

  get precedence() {
    return 1;
  }

  to_nfa_design() {
    const first_nfa_design = this.first.to_nfa_design();
    const second_nfa_design = this.second.to_nfa_design();
    const start_state = first_nfa_design.start_state;
    const accept_states = second_nfa_design.accept_states;
    const rules = first_nfa_design.rulebook.rules.concat(
      second_nfa_design.rulebook.rules
    );
    const extra_rules = first_nfa_design.accept_states.map(state => {
      return new FARule(state, null, second_nfa_design.start_state);
    });
    const rulebook = new NFARulebook(rules.concat(extra_rules));
    return new NFADesign(start_state, accept_states, rulebook);
  }
}

export default Concatenate;
