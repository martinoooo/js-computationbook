import assert from "assert";
import Number from "./expression/number";
import Multiply from "./expression/multiply";
import Add from "./expression/add";
import Machine from "./machine";
import LessThan from "./expression/less_than";
import Variable from "./expression/variable";
import Assign from "./statement/assign";
import If from "./statement/if";
import Boolean from "./expression/boolean";
import DoNothing from "./statement/do_nothing";
import Sequence from "./statement/sequence";
import While from "./statement/while";

console.log("-------通过事例化这些类来手工构造抽象语法树----------");
// 为了方便查看抽象语法树的内容，我们将覆盖每个类的inspect方法，让它返回自定义的字符串表示
// (node里面有一个inspect的方法，console会调用inspect，所以我们可以修改这个方法来修改输出的字符)
let expression = new Add(
  new Multiply(new Number(1), new Number(2)),
  new Multiply(new Number(3), new Number(4))
);
console.log(expression); // <<1 * 2 + 3 * 4>>
console.log(new Number(5)); // <<5>>

assert.strictEqual(new Number(1).reducible(), false, "Number总是不能规约的");
assert.strictEqual(
  new Add(new Number(1), new Number(2)).reducible(),
  true,
  "Add总是能规约的"
);

console.log("--------对抽象语法树进行规约---------");
expression = new Add(
  new Multiply(new Number(1), new Number(2)),
  new Multiply(new Number(3), new Number(4))
);
console.log(expression); // => «1 * 2 + 3 * 4»
assert.strictEqual(expression.reducible(), true, "expression是可以规约的");
expression = expression.reduce();
console.log(expression); // => «2 + 3 * 4»
assert.strictEqual(expression.reducible(), true, "expression是可以规约的");
expression = expression.reduce();
console.log(expression); // => «2 + 12»
assert.strictEqual(expression.reducible(), true, "expression是可以规约的");
expression = expression.reduce();
console.log(expression); // => «14»
assert.strictEqual(expression.reducible(), false, "expression不可以规约了");

console.log("--------创建一个虚拟机去自动执行规约的操作---------");
let machine = new Machine(
  new Add(
    new Multiply(new Number(1), new Number(2)),
    new Multiply(new Number(3), new Number(4))
  )
);
assert.deepEqual(machine.run(), new Number(14), "表达式规约成14");

machine = new Machine(
  new LessThan(new Number(5), new Add(new Number(2), new Number(2)))
);
assert.deepEqual(machine.run(), new Boolean(false), "表达式规约成false");

console.log("-------对变量进行规约---------");
machine = new Machine(new Add(new Variable("x"), new Number(2)), {
  x: new Number(3),
  y: new Number(4)
});
assert.deepEqual(machine.run(), new Number(5), "表达式规约成5");

console.log("-------对赋值语句进行规约---------");
let statement = new Assign("x", new Add(new Variable("x"), new Number(1)));
let environment = { x: new Number(2) };
console.log([statement, environment]); // [ <<x = x + 1>>, { x: <<2>> } ]

[statement, environment] = statement.reduce(environment);
console.log([statement, environment]); // [ <<x = 2 + 1>>, { x: <<2>> } ]

[statement, environment] = statement.reduce(environment);
console.log([statement, environment]); // [ <<x = 3>>, { x: <<2>> } ]

[statement, environment] = statement.reduce(environment);
console.log([statement, environment]); // [ <<do-nothing>>, { x: <<3>> } ]

console.log("--------创建一个虚拟机去自动执行语句的规约操作---------");
machine = new Machine(
  new Assign("x", new Add(new Variable("x"), new Number(1))),
  {
    x: new Number(2)
  }
);
assert.deepEqual(
  machine.run()[1],
  {
    x: new Number(3)
  },
  "环境变成了{x:3}"
);

console.log("-------对条件语句进行规约---------");
machine = new Machine(
  new If(
    new Variable("x"),
    new Assign("y", new Number(1)),
    new Assign("y", new Number(2))
  ),
  { x: new Boolean(true) }
);
assert.deepEqual(
  machine.run()[1],
  {
    x: new Boolean(true),
    y: new Number(1)
  },
  "环境变成了{x:true, y: 1}"
);

machine = new Machine(
  new If(new Variable("x"), new Assign("y", new Number(1)), new DoNothing()),
  { x: new Boolean(false) }
);
assert.deepEqual(
  machine.run()[1],
  {
    x: new Boolean(false)
  },
  "环境变成了{x: false}"
);

console.log("-------对序列语句进行规约---------");
machine = new Machine(
  new Sequence(
    new Assign("x", new Add(new Number(1), new Number(1))),
    new Assign("y", new Add(new Variable("x"), new Number(3)))
  ),
  {}
);
assert.deepEqual(
  machine.run()[1],
  {
    x: new Number(2),
    y: new Number(5)
  },
  "环境变成了{x: false}"
);

console.log("-------对循环语句进行规约---------");
statement = new While(
  new LessThan(new Variable("x"), new Number(5)),
  new Assign("x", new Multiply(new Variable("x"), new Number(3)))
);
console.log(statement);
machine = new Machine(statement, { x: new Number(1) });
assert.deepEqual(
  machine.run()[1],
  {
    x: new Number(9)
  },
  "环境变成了{x: 9}"
);
