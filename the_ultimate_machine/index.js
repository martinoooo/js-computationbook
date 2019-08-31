import assert from "assert";
import Tape from "./tape";
import TMRule from "./tm_rule";
import TMConfiguration from "./tm_configuration";
import DTMRulebook from "./dtm_rulebook";
import DTM from "./dtm";

let tape = new Tape(["1", "0", "1"], "1", [], "_");
console.log(tape); //  => #<Tape 101(1)>
assert.strictEqual(tape.middle, "1");

console.log("-----------------------");
console.log(tape); // => #<Tape 101(1)>
console.log(tape.move_head_left()); // => #<Tape 10(1)1>
console.log(tape.write("0")); // => #<Tape 101(0)>
console.log(tape.move_head_right()); // => #<Tape 1011(_)>
console.log(tape.move_head_right().write("0")); // => #<Tape 1011(0)>

console.log("-----------------------");
let rule = new TMRule(1, "0", 2, "1", "right");
console.log(rule);
// => #<struct TMRule state=1, character="0", next_state=2, write_character="1", direction=:right
assert.strictEqual(
  rule.applies_to(new TMConfiguration(1, new Tape([], "0", [], "_"))),
  true
);
assert.strictEqual(
  rule.applies_to(new TMConfiguration(1, new Tape([], "1", [], "_"))),
  false
);
assert.strictEqual(
  rule.applies_to(new TMConfiguration(2, new Tape([], "0", [], "_"))),
  false
);

console.log("-----------------------");
console.log(rule.follow(new TMConfiguration(1, new Tape([], "0", [], "_"))));
//  => #<struct TMConfiguration state=2, tape=#<Tape 1(_)>>

console.log("-----------------------");
let rulebook = new DTMRulebook([
  new TMRule(1, "0", 2, "1", "right"),
  new TMRule(1, "1", 1, "0", "left"),
  new TMRule(1, "_", 2, "1", "right"),
  new TMRule(2, "0", 2, "0", "right"),
  new TMRule(2, "1", 2, "1", "right"),
  new TMRule(2, "_", 3, "_", "left")
]);
// => #<struct DTMRulebook rules=[...]>
let configuration = new TMConfiguration(1, tape);
console.log(configuration);
// => #<struct TMConfiguration state=1, tape=#<Tape 101(1)>>
configuration = rulebook.next_configuration(configuration);
console.log(configuration);
// => #<struct TMConfiguration state=1, tape=#<Tape 10(1)0>>
configuration = rulebook.next_configuration(configuration);
console.log(configuration);
// => #<struct TMConfiguration state=1, tape=#<Tape 1(0)00>>
configuration = rulebook.next_configuration(configuration);
console.log(configuration);
// => #<struct TMConfiguration state=2, tape=#<Tape 11(0)0>>

console.log("-----------------------");
let dtm = new DTM(new TMConfiguration(1, tape), [3], rulebook);
console.log(dtm.current_configuration);
// => #<struct TMConfiguration state=1, tape=#<Tape 101(1)>>
assert.strictEqual(dtm.accepting(), false);
dtm.step();
console.log(dtm.current_configuration);
// => #<struct TMConfiguration state=1, tape=#<Tape 10(1)0>>
assert.strictEqual(dtm.accepting(), false);
dtm.run();
console.log(dtm.current_configuration);
// #<struct TMConfiguration state=3, tape=#<Tape 110(0)_>>
assert.strictEqual(dtm.accepting(), true);

console.log("-----------------------");
tape = new Tape(["1", "2", "1"], "1", [], "_");
console.log(tape);
// => #<Tape 121(1)>
dtm = new DTM(new TMConfiguration(1, tape), [3], rulebook); //  => #<struct DTM ...>
dtm.run(); // NoMethodError: undefined method 'follow' for nil:NilClass
assert.strictEqual(dtm.stuck(), true);

console.log("---------识别'aaabbbccc'这样的字符串--------------");
rulebook = new DTMRulebook([
  // 状态 1: 向右扫描，查找 a
  new TMRule(1, "X", 1, "X", "right"), // 跳过 X
  new TMRule(1, "a", 2, "X", "right"), // 删除 a，进入状态2
  new TMRule(1, "_", 6, "_", "left"), // 查找空格，进入状态 6（接受）

  // 状态 2:向右扫描，查找 b
  new TMRule(2, "a", 2, "a", "right"), // 跳过 a
  new TMRule(2, "X", 2, "X", "right"), // 跳过 X
  new TMRule(2, "b", 3, "X", "right"), // 删除 b，进入状态 3

  // 状态 3:向右扫描，查找 c
  new TMRule(3, "b", 3, "b", "right"), // 跳过 b
  new TMRule(3, "X", 3, "X", "right"), // 跳过 X
  new TMRule(3, "c", 4, "X", "right"), // 删除 c，进入状态4

  // 状态 4:向右扫描，查找字符串标记结束
  new TMRule(4, "c", 4, "c", "right"), // 跳过 c
  new TMRule(4, "_", 5, "_", "left"), // 查找空格，进入状态 5

  // 状态5:向右扫描，查找字符串标记结束
  new TMRule(5, "a", 5, "a", "left"), // 跳过 a
  new TMRule(5, "b", 5, "b", "left"), // 跳过 b
  new TMRule(5, "c", 5, "c", "left"), // 跳过 c
  new TMRule(5, "X", 5, "X", "left"), // 跳过 X
  new TMRule(5, "_", 1, "_", "right") // 查找空格，进入状态1
]);
tape = new Tape([], "a", ["a", "a", "b", "b", "b", "c", "c", "c"], "_");
console.log(tape); // => #<Tape (a)aabbbccc>
dtm = new DTM(new TMConfiguration(1, tape), [6], rulebook);
for (let i = 0; i < 10; i++) {
  dtm.step();
}
console.log(dtm.current_configuration);
// => #<struct TMConfiguration state=5, tape=#<Tape XaaXbbXc(c)_>>
for (let i = 0; i < 25; i++) {
  dtm.step();
}
console.log(dtm.current_configuration);
// => #<struct TMConfiguration state=5, tape=#<Tape _XXa(X)XbXXc_>>
dtm.run();
console.log(dtm.current_configuration);
// => #<struct TMConfiguration state=6, tape=#<Tape _XXXXXXXX(X)_>>
