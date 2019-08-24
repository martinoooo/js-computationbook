class DFARulebook {
  constructor(rules) {
    this.rules = rules;
  }

  // 返回规则书里规定的下一个状态
  next_state(state, character) {
    return this.rule_for(state, character).follow();
  }

  rule_for(state, character) {
    return this.rules.find(rule => {
      return rule.applies_to(state, character);
    });
  }
}

export default DFARulebook;
