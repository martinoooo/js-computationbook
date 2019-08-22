class DTMRulebook {
  constructor(rules) {
    this.rules = rules;
  }

  next_configuration(configuration) {
    return this.rule_for(configuration).follow(configuration);
  }

  rule_for(configuration) {
    return this.rules.find(rule => {
      return rule.applies_to(configuration);
    });
  }

  applies_to(configuration) {
    return !!this.rule_for(configuration);
  }
}

export default DTMRulebook;
