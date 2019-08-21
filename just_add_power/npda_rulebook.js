import { unique, include, concat } from "./utils";

class NPDARulebook {
  constructor(rules) {
    this.rules = rules;
  }

  next_configurations(configurations, character) {
    const arr = configurations
      .map(config => {
        return this.follow_rules_for(config, character);
      })
      .reduce((a, b) => a.concat(b), []);
    // 对象去重
    return unique(arr);
  }

  follow_rules_for(configuration, character) {
    return this.rules_for(configuration, character).map(rule => {
      return rule.follow(configuration);
    });
  }

  rules_for(configuration, character) {
    return this.rules.filter(rule => {
      return rule.applies_to(configuration, character);
    });
  }

  follow_free_moves(configurations) {
    const more_configurations = this.next_configurations(configurations, null);

    if (include(more_configurations, configurations)) {
      return configurations;
    } else {
      return this.follow_free_moves(
        concat(configurations, more_configurations)
      );
    }
  }
}

export default NPDARulebook;
