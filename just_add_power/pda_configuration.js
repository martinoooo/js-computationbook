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
