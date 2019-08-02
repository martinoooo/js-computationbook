class NFARulebook {
  constructor(rules) {
    this.rules = rules;
  }

  // 根据目前状态输入的值，获取下个状态
  next_states(states, character) {
    const arr = states
      .map(state => {
        return this.follow_rules_for(state, character);
      })
      .reduce((a, b) => a.concat(b), []);
    return [...new Set(arr)];
  }

  follow_rules_for(state, character) {
    return this.rules_for(state, character).map(n => {
      return n.follow();
    });
  }

  rules_for(state, character) {
    return this.rules.filter(rule => {
      return rule.applies_to(state, character);
    });
  }

  follow_free_moves(states) {
    const more_states = this.next_states(states, null);
    const temp = Array.from(new Set(states.concat(more_states)));
    // 如果可能的状态包括初始状态，就可以返回了
    if (temp.length === states.length) {
      return states;
    } else {
      return this.follow_free_moves(temp);
    }
  }

  alphabet() {
    const characters = this.rules
      .map(farule => {
        return farule.character;
      })
      .filter(character => {
        return !!character;
      });
    return Array.from(new Set([...characters]));
  }
}

export default NFARulebook;
