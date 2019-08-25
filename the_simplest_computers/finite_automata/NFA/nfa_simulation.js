import FARule from "../fa_rule";
import DFADesign from "../DFA/dfa_design";
import DFARulebook from "../DFA/dfa_rulebook";

class NFASimulation {
  constructor(nfa_design) {
    this.nfa_design = nfa_design;
  }

  // 不同的起始状态，获得NFA的下一个状态
  next_state(state, character) {
    const nfa = this.nfa_design.to_nfa(state);
    return nfa.read_character(character).current_states;
  }

  // 查看不同的状态下，每一个输入将会获得如何的下一个状态
  rules_for(states) {
    return this.nfa_design.rulebook.alphabet().map(character => {
      return new FARule(states, character, this.next_state(states, character));
    });
  }

  // states为二维数组
  discover_states_and_rules(statess) {
    const rules = statess
      .map(states => {
        return this.rules_for(states);
      })
      .reduce((a, b) => a.concat(b));
    // 获取下一个状态
    const more_states = rules.map(rule => rule.follow());
    if (include(more_states, statess)) {
      return [statess, rules];
    } else {
      return this.discover_states_and_rules(concat(statess, more_states));
    }
  }

  to_dfa_design() {
    const start_state = this.nfa_design.to_nfa().current_states;
    const [states, rules] = this.discover_states_and_rules([start_state]);
    const accept_states = states.filter(state => {
      return this.nfa_design.to_nfa(state).accepting();
    });
    return new DFADesign(start_state, accept_states, new DFARulebook(rules));
  }
}

export default NFASimulation;

// 判断arr2是否包含arr1数组
function include(arr1, arr2) {
  return arr1.every(element => {
    const val1 = element.sort().toString();
    return arr2.find(item => {
      const val2 = item.sort().toString();
      return val1 === val2;
    });
  });
}

function concat(arr1, arr2) {
  return unique(arr1.concat(arr2));

  function unique(array) {
    var obj = {};
    return array.filter(item => {
      const key = item.sort().toString();
      return obj[key] ? false : (obj[key] = true);
    });
  }
}
