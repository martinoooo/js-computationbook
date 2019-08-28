import assert from "assert";
import Stack from "../stack";
import PDARule from "../pda_rule";
import PDAConfiguration from "../pda_configuration";
import DPDARulebook from "./dpda_rulebook";
import DPDA from "./dpda";
import DPDADesign from "./dpda_design";

let stack = new Stack(["a", "b", "c", "d", "e"]);
console.log(stack);
assert.strictEqual(stack.top, "a");
assert.strictEqual(stack.pop().pop().top, "c");
assert.strictEqual(stack.push("x").push("y").top, "y");
assert.strictEqual(
  stack
    .push("x")
    .push("y")
    .pop().top,
  "x"
);

console.log("-----------------------");
let rule = new PDARule(1, "(", 2, "$", ["b", "$"]);
console.log(rule);
let configuration = new PDAConfiguration(1, new Stack(["$"]));
console.log(configuration);
assert.strictEqual(rule.applies_to(configuration, "("), true);

console.log("-----------------------");
stack = new Stack(["$"])
  .push("x")
  .push("y")
  .push("z");
console.log(stack); // => #<Stack (z)yx$>
assert.strictEqual(stack.top, "z");
stack = stack.pop();
assert.strictEqual(stack.top, "y");
stack = stack.pop();
assert.strictEqual(stack.top, "x");
console.log(rule.follow(configuration)); //  #<struct PDAConfiguration state=2, stack=#<Stack (b)$>>

console.log("-----------------------");
let rulebook = new DPDARulebook([
  new PDARule(1, "(", 2, "$", ["b", "$"]),
  new PDARule(2, "(", 2, "b", ["b", "b"]),
  new PDARule(2, ")", 2, "b", []),
  new PDARule(2, null, 1, "$", ["$"])
]);
console.log(rulebook);
configuration = rulebook.next_configuration(configuration, "(");
console.log(configuration); // => #<struct PDAConfiguration state=2, stack=#<Stack (b)$>>
configuration = rulebook.next_configuration(configuration, "(");
console.log(configuration); // => #<struct PDAConfiguration state=2, stack=#<Stack (b)b$>>
configuration = rulebook.next_configuration(configuration, ")");
console.log(configuration); // => #<struct PDAConfiguration state=2, stack=#<Stack (b)$>>

console.log("-----------------------");
let dpda = new DPDA(new PDAConfiguration(1, new Stack(["$"])), [1], rulebook);
console.log(dpda); // => #<struct DPDA ...>
assert.strictEqual(dpda.accepting(), true);
dpda.read_string("(()");
assert.strictEqual(dpda.accepting(), false);
console.log(dpda.current_configuration); // => #<struct PDAConfiguration state=2, stack=#<Stack (b)$>

console.log("-----------------------");
configuration = new PDAConfiguration(2, new Stack(["$"]));
console.log(configuration); //  => #<struct PDAConfiguration state=2, stack=#<Stack ($)>>
console.log(rulebook.follow_free_moves(configuration));
//  => #<struct PDAConfiguration state=1, stack=#<Stack ($)>>

// new DPDARulebook([new PDARule(1, null, 1, "$", ["$"])]).follow_free_moves(
//   new PDAConfiguration(1, new Stack(["$"]))
// ); // Maximum call stack size exceeded

console.log("-----------------------");
dpda = new DPDA(new PDAConfiguration(1, new Stack(["$"])), [1], rulebook);
console.log(dpda); // => #<struct DPDA ...>
dpda.read_string("(()(");
assert.strictEqual(dpda.accepting(), false);
console.log(dpda.current_configuration); // => #<struct PDAConfiguration state=2, stack=#<Stack (b)b$>>
dpda.read_string("))()");
assert.strictEqual(dpda.accepting(), true);
console.log(dpda.current_configuration); // => #<struct PDAConfiguration state=1, stack=#<Stack ($)>>

console.log("-----------------------");
let dpda_design = new DPDADesign(1, "$", [1], rulebook);
console.log(dpda_design); // => #<struct DPDADesign ...>
assert.strictEqual(dpda_design.accepts("(((((((((())))))))))"), true);
assert.strictEqual(dpda_design.accepts("()(())((()))(()(()))"), true);
assert.strictEqual(dpda_design.accepts("(()(()(()()(()()))()"), false);
assert.strictEqual(dpda_design.accepts("())"), false);

console.log("-----------------------");
dpda = new DPDA(new PDAConfiguration(1, new Stack(["$"])), [1], rulebook);
console.log(dpda); //  => #<struct DPDA ...>
dpda.read_string("())");
console.log(dpda.current_configuration); // PDAConfiguration { state:'STUCK_STATE', stack: #<Stack ($)> }
assert.strictEqual(dpda.accepting(), false);
assert.strictEqual(dpda.isStuck(), true);
assert.strictEqual(dpda_design.accepts("())"), false);
