class Tape {
  constructor(left, middle, right, blank) {
    this.left = left;
    this.middle = middle;
    this.right = right;
    this.blank = blank;
  }

  write(character) {
    return new Tape(this.left, character, this.right, this.blank);
  }

  move_head_left() {
    return new Tape(
      this.left.slice(0, -1),
      [...this.left].pop() || this.blank,
      [this.middle].concat(this.right),
      this.blank
    );
  }

  move_head_right() {
    return new Tape(
      this.left.concat([this.middle]),
      this.right[0] || this.blank,
      this.right.slice(1),
      this.blank
    );
  }

  inspect() {
    return `#<Tape ${this.left.join("")}(${this.middle})${this.right.join(
      ""
    )}>`;
  }
}

export default Tape;
