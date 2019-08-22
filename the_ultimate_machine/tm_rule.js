import TMConfiguration from "./tm_configuration";

class TMRule {
  constructor(state, character, next_state, write_character, direction) {
    this.state = state;
    this.character = character;
    this.next_state = next_state;
    this.write_character = write_character;
    this.direction = direction;
  }

  applies_to(configuration) {
    return (
      this.state == configuration.state &&
      this.character == configuration.tape.middle
    );
  }

  follow(configuration) {
    return new TMConfiguration(this.next_state, this.next_tape(configuration));
  }

  next_tape(configuration) {
    const written_tape = configuration.tape.write(this.write_character);
    switch (this.direction) {
      case "left": {
        return written_tape.move_head_left();
      }
      case "right": {
        return written_tape.move_head_right();
      }
    }
  }
}

export default TMRule;
