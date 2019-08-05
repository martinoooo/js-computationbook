class Stack {
  constructor(contents) {
    this.contents = contents;
  }

  push(character) {
    return new Stack([character].concat(this.contents));
  }

  pop() {
    return new Stack(this.contents.slice(1));
  }

  get top() {
    return this.contents[0];
  }

  inspect() {
    return `#<Stack (${this.top})${this.contents.slice(1).join("")}>`;
  }
}

export default Stack;
