import PDAConfiguration from "../pda_configuration";
import DPDA from "./dpda";
import Stack from "../stack";

class DPDADesign {
  constructor(start_state, bottom_character, accept_states, rulebook) {
    this.start_state = start_state; // 初始状态
    this.bottom_character = bottom_character; // 栈中初始的字符
    this.accept_states = accept_states; // 可接受的状态
    this.rulebook = rulebook; // 规则书
  }

  accepts(string) {
    const dpda = this.to_dpda();
    return dpda.read_string(string).accepting();
  }

  to_dpda() {
    const start_stack = new Stack([this.bottom_character]);
    const start_configuration = new PDAConfiguration(
      this.start_state,
      start_stack
    );
    return new DPDA(start_configuration, this.accept_states, this.rulebook);
  }
}

export default DPDADesign;
