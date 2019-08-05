import PDAConfiguration from "./pda_configuration";

class PDARule {
  constructor(state, character, next_state, pop_character, push_characters) {
    this.state = state;
    this.character = character;
    this.next_state = next_state;
    this.pop_character = pop_character;
    this.push_characters = push_characters;
  }

  applies_to(configuration, character) {
    return (
      this.state == configuration.state &&
      this.pop_character == configuration.stack.top &&
      this.character == character
    );
  }

  follow(configuration) {
    return new PDAConfiguration(
      this.next_state,
      this.next_stack(configuration)
    );
  }

  next_stack(configuration) {
    let popped_stack = configuration.stack.pop();
    [...this.push_characters].reverse().forEach(character => {
      popped_stack = popped_stack.push(character);
    });
    return popped_stack;
  }
}

export default PDARule;
