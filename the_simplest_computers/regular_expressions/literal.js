import Pattern from "./pattern";
import FARule from "../finite_automata/fa_rule";
import NFARulebook from "../finite_automata/NFA/nfa_rulebook";
import NFADesign from "../finite_automata/NFA/nfa_design";
import uniqId from "./uniqId";

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
    const start_state = uniqId();
    // 使用uniqId，保证accept_state是唯一的，只有通过这个规则才可以到达接受状态
    const accept_state = uniqId();
    const rule = new FARule(start_state, this.character, accept_state);
    const rulebook = new NFARulebook([rule]);

    return new NFADesign(start_state, [accept_state], rulebook);
  }
}

export default Literal;
