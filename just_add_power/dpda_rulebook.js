class DPDARulebook {
  constructor(rules) {
    this.rules = rules;
  }

  next_configuration(configuration, character) {
    return this.rule_for(configuration, character).follow(configuration);
  }

  rule_for(configuration, character) {
    return this.rules.find(rule => {
      return rule.applies_to(configuration, character);
    });
  }

  applies_to(configuration, character) {
    return !!this.rule_for(configuration, character);
  }

  follow_free_moves(configuration) {
    if (this.applies_to(configuration, null)) {
      return this.follow_free_moves(
        this.next_configuration(configuration, null)
      );
    } else {
      return configuration;
    }
  }
}

export default DPDARulebook;
