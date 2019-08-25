import Pattern from "./pattern";
import NFARulebook from "../finite_automata/NFA/nfa_rulebook";
import NFADesign from "../finite_automata/NFA/nfa_design";
import uniqId from "./uniqId";

class Empty extends Pattern {
  get to_s() {
    return "";
  }

  get precedence() {
    return 3;
  }

  // 当读取空时，下一个状态不变，所以是接受的状态
  // 当读取字符串时，下一个状态变为[]，不再accept_states里面，所以不是接受的状态
  to_nfa_design() {
    // 使用uniqId，保证目前状态是唯一的，其它状态不能转移到这个状态
    const start_state = uniqId();
    const accept_states = [start_state];
    const rulebook = new NFARulebook([]);
    return new NFADesign(start_state, accept_states, rulebook);
  }
}

export default Empty;
