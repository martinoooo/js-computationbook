import Pattern from "./pattern";
import uniqId from "./uniqId";
import FARule from "../finite_automata/fa_rule";
import NFARulebook from "../finite_automata/NFA/nfa_rulebook";
import NFADesign from "../finite_automata/NFA/nfa_design";

class Choose extends Pattern {
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
      .join("|");
  }

  get precedence() {
    return 0;
  }

  to_nfa_design() {
    const first_nfa_design = this.first.to_nfa_design();
    const second_nfa_design = this.second.to_nfa_design();
    const start_state = uniqId();
    const accept_states = first_nfa_design.accept_states.concat(
      second_nfa_design.accept_states
    );
    const rules = first_nfa_design.rulebook.rules.concat(
      second_nfa_design.rulebook.rules
    );
    // 起始状态可以通过自由移动到两台NFA的起始状态
    const extra_rules = [first_nfa_design, second_nfa_design].map(
      nfa_design => {
        return new FARule(start_state, null, nfa_design.start_state);
      }
    );
    const rulebook = new NFARulebook(rules.concat(extra_rules));
    return new NFADesign(start_state, accept_states, rulebook);
  }
}

export default Choose;
