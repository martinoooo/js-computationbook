import Pattern from "./pattern";
import uniqId from "./uniqId";
import FARule from "../finite_automata/fa_rule";
import NFARulebook from "../finite_automata/NFA/nfa_rulebook";
import NFADesign from "../finite_automata/NFA/nfa_design";

class Repeat extends Pattern {
  constructor(pattern) {
    super();
    this.pattern = pattern;
  }

  get to_s() {
    return this.pattern.bracket(this.precedence) + "*";
  }

  get precedence() {
    return 2;
  }

  to_nfa_design() {
    const pattern_nfa_design = this.pattern.to_nfa_design();
    const start_state = uniqId();
    const accept_states = pattern_nfa_design.accept_states.concat([
      start_state
    ]);
    const rules = pattern_nfa_design.rulebook.rules;
    const extra_rules = pattern_nfa_design.accept_states
      .map(accept_state => {
        // 一些额外的自由移动，把旧NFA的每一个接受状态与旧的起始状态连接起来；
        return new FARule(accept_state, null, pattern_nfa_design.start_state);
      })
      // 另一些自由移动，把新的起始状态与旧的起始状态连接起来
      .concat([new FARule(start_state, null, pattern_nfa_design.start_state)]);
    const rulebook = new NFARulebook(rules.concat(extra_rules));
    return new NFADesign(start_state, accept_states, rulebook);
  }
}

export default Repeat;
