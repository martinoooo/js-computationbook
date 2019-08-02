import FARule from "./fa_rule";
import DFADesign from "./dfa_design";
import DFARulebook from "./dfa_rulebook";

class NFASimulation {
  constructor(nfa_design) {
    this.nfa_design = nfa_design;
  }

  next_state(state, character) {
    const nfa = this.nfa_design.to_nfa(state);
    return nfa.read_character(character).current_states;
  }

  rules_for(state) {
    return this.nfa_design.rulebook.alphabet().map(character => {
      return new FARule(state, character, this.next_state(state, character));
    });
  }

  discover_states_and_rules(states) {
    const rules = states
      .map(state => {
        return this.rules_for(state);
      })
      .reduce((a, b) => a.concat(b));
    const more_states = rules.map(rule => rule.follow());
    const temp = Array.from(
      new Set(states.concat(more_states).map(n => n.toString()))
    );
    if (temp.length === states.length) {
      return [states, rules];
    } else {
      return this.discover_states_and_rules(temp.map(n => n.split(",")));
    }
  }

  to_dfa_design() {
    const start_state = this.nfa_design.to_nfa().current_states;
    const [states, rules] = this.discover_states_and_rules([start_state]);
    const accept_states = states.find(state => {
      return this.nfa_design.to_nfa(state).accepting();
    });
    return new DFADesign(start_state, accept_states, new DFARulebook(rules));
  }
}

export default NFASimulation;
