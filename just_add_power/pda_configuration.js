//  DPDA的当前配置，一个state和一个栈的组合
class PDAConfiguration {
  constructor(state, stack) {
    this.STUCK_STATE = "STUCK_STATE";
    this.state = state;
    this.stack = stack;
  }

  get stuck() {
    return new PDAConfiguration(this.STUCK_STATE, this.stack);
  }

  isStuck() {
    return this.state === this.STUCK_STATE;
  }
}

export default PDAConfiguration;
