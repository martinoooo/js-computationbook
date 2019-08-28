import PDAConfiguration from "./pda_configuration";

// 栈更新的规则
class PDARule {
  constructor(state, character, next_state, pop_character, push_characters) {
    this.state = state; // 当前的状态
    this.character = character; // 必须从输入读取的字符（可选）
    this.next_state = next_state; // 下个状态
    this.pop_character = pop_character; // 必须从栈中弹出的字符
    this.push_characters = push_characters; // 栈顶字符弹出后需要推入栈中的字符序列
  }

  // 判断输入字符，当前配置是否可以转移到下一个配置
  applies_to(configuration, character) {
    return (
      this.state == configuration.state &&
      this.character == character &&
      this.pop_character == configuration.stack.top
    );
  }

  // 接受当前配置，返回下一个配置（下一个状态，和下一个栈）
  follow(configuration) {
    return new PDAConfiguration(
      this.next_state,
      this.next_stack(configuration)
    );
  }

  // 弹出栈的第一个，然后插入定义的需要插入的字符push_characters
  next_stack(configuration) {
    let popped_stack = configuration.stack.pop();
    [...this.push_characters].reverse().forEach(character => {
      popped_stack = popped_stack.push(character);
    });
    return popped_stack;
  }
}

export default PDARule;
