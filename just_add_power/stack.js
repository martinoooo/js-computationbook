class Stack {
  constructor(contents) {
    this.contents = contents;
  }

  // 放到第一个
  push(character) {
    return new Stack([character].concat(this.contents));
  }

  // 拿出第一个
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
