//  一个DPDA对象，有当前的配置，可以接受的状态，规则书
class DPDA {
  constructor(current_configuration, accept_states, rulebook) {
    this.local_current_configuration = current_configuration;
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  get current_configuration() {
    return this.rulebook.follow_free_moves(this.local_current_configuration);
  }

  // 可以接受的状态中是否包括了当前配置的状态
  accepting() {
    return this.accept_states.includes(this.current_configuration.state);
  }

  read_character(character) {
    this.local_current_configuration = this.next_configuration(character);
  }

  // 读取字符串，获取下一个配置
  read_string(string) {
    let chars = string.split("");
    for (let i = 0; i < chars.length; i++) {
      if (this.isStuck()) {
        break;
      }
      this.read_character(chars[i]);
    }
    return this;
  }

  next_configuration(character) {
    // 如果没有规则应用到，就说明是stuck了。
    if (this.rulebook.applies_to(this.current_configuration, character)) {
      return this.rulebook.next_configuration(
        this.current_configuration,
        character
      );
    } else {
      return this.current_configuration.stuck;
    }
  }

  isStuck() {
    return this.current_configuration.isStuck();
  }
}

export default DPDA;
