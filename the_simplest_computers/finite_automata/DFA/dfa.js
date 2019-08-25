class DFA {
  constructor(current_state, accept_states, rulebook) {
    this.current_state = current_state; // 可能为数字，也有可能为数组
    this.accept_states = accept_states;
    this.rulebook = rulebook;
  }

  accepting() {
    if (typeof this.current_state === "number") {
      return this.accept_states.includes(this.current_state);
    } else {
      return include(this.current_state, this.accept_states);
    }
  }

  read_character(character) {
    this.current_state = this.rulebook.next_state(
      this.current_state,
      character
    );
    return this;
  }

  read_string(string) {
    const arr = string.split("");
    arr.forEach(character => {
      this.read_character(character);
    });
    return this;
  }
}

export default DFA;

// 判断arr2是否包含arr1数组
function include(arr1, arr2) {
  return !!arr2.find(item => {
    return item.sort().toString() === arr1.sort().toString();
  });
}
