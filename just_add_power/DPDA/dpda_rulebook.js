// 栈更新的规则的集合书
class DPDARulebook {
  constructor(rules) {
    this.rules = rules;
  }

  // 获取下一个配置
  next_configuration(configuration, character) {
    return this.rule_for(configuration, character).follow(configuration);
  }

  // 查找规则书中可以接受当前配置及输入字符的规则
  rule_for(configuration, character) {
    return this.rules.find(rule => {
      return rule.applies_to(configuration, character);
    });
  }

  applies_to(configuration, character) {
    return !!this.rule_for(configuration, character);
  }

  // 自由移动，当输入为null时，是否配置可以更新
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
