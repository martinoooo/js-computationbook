class Variable {
  constructor(name) {
    this.name = name;
  }

  inspect() {
    return `<<${this.toString()}>>`;
  }

  toString() {
    return this.name;
  }

  reducible() {
    return true;
  }

  // 变量的含义就是在环境中查找变量名并返回查找到的值
  reduce(environment) {
    return environment[this.name];
  }
}

export default Variable;
