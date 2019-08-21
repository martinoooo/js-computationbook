import Stack from "./stack";
import PDARule from "./pda_rule";
import PDAConfiguration from "./pda_configuration";
import DPDARulebook from "./dpda_rulebook";
import DPDA from "./dpda";
import DPDADesign from "./dpda_design";

let stack = new Stack(["a", "b", "c", "d", "e"]);
console.log(stack);
console.log(stack.top); // => "a"
console.log(stack.pop().pop().top); // => "c"
console.log(stack.push("x").push("y").top); // => "y"
console.log(
  stack
    .push("x")
    .push("y")
    .pop().top
); // => "x"

console.log("-----------------------");
let rule = new PDARule(1, "(", 2, "$", ["b", "$"]);
console.log(rule);
let configuration = new PDAConfiguration(1, new Stack(["$"]));
console.log(configuration);
console.log(rule.applies_to(configuration, "(")); // true

console.log("-----------------------");
stack = new Stack(["$"])
  .push("x")
  .push("y")
  .push("z");
console.log(stack); // => #<Stack (z)yx$>
console.log(stack.top); // => "z"
stack = stack.pop();
console.log(stack.top); // => "y"
stack = stack.pop();
console.log(stack.top); // => "x"
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
console.log(dpda.accepting()); // => true
dpda.read_string("(()");
console.log(dpda.accepting()); // => false
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
console.log(dpda.accepting()); // => false
console.log(dpda.current_configuration); // => #<struct PDAConfiguration state=2, stack=#<Stack (b)b$>>
dpda.read_string("))()");
console.log(dpda.accepting()); // => true
console.log(dpda.current_configuration); // => #<struct PDAConfiguration state=1, stack=#<Stack ($)>>

console.log("-----------------------");
let dpda_design = new DPDADesign(1, "$", [1], rulebook);
console.log(dpda_design); // => #<struct DPDADesign ...>
console.log(dpda_design.accepts("(((((((((())))))))))")); // => true
console.log(dpda_design.accepts("()(())((()))(()(()))")); // => true
console.log(dpda_design.accepts("(()(()(()()(()()))()")); // => false
console.log(dpda_design.accepts("())")); // false

console.log("-----------------------");
dpda = new DPDA(new PDAConfiguration(1, new Stack(["$"])), [1], rulebook);
console.log(dpda); //  => #<struct DPDA ...>
dpda.read_string("())");
console.log(dpda.current_configuration); // PDAConfiguration { state: 112, stack: #<Stack ($)> }
console.log(dpda.accepting()); // => false
console.log(dpda.isStuck()); // => true
console.log(dpda_design.accepts("())")); // => false

console.log("-----------------------");
rulebook = new DPDARulebook([
  new PDARule(1, "a", 2, "$", ["a", "$"]),
  new PDARule(1, "b", 2, "$", ["b", "$"]),
  new PDARule(2, "a", 2, "a", ["a", "a"]),
  new PDARule(2, "b", 2, "b", ["b", "b"]),
  new PDARule(2, "a", 2, "b", []),
  new PDARule(2, "b", 2, "a", []),
  new PDARule(2, null, 1, "$", ["$"])
]);
console.log(rulebook);
dpda_design = new DPDADesign(1, "$", [1], rulebook);
console.log(dpda_design);
console.log(dpda_design.accepts("ababab"));
console.log(dpda_design.accepts("bbbaaaab"));
console.log(dpda_design.accepts("baa"));

console.log("-----------------------");
rulebook = new DPDARulebook([
  new PDARule(1, "a", 1, "$", ["a", "$"]),
  new PDARule(1, "a", 1, "a", ["a", "a"]),
  new PDARule(1, "a", 1, "b", ["a", "b"]),
  new PDARule(1, "b", 1, "$", ["b", "$"]),
  new PDARule(1, "b", 1, "a", ["b", "a"]),
  new PDARule(1, "b", 1, "b", ["b", "b"]),
  new PDARule(1, "m", 2, "$", ["$"]),
  new PDARule(1, "m", 2, "a", ["a"]),
  new PDARule(1, "m", 2, "b", ["b"]),
  new PDARule(2, "a", 2, "a", []),
  new PDARule(2, "b", 2, "b", []),
  new PDARule(2, null, 3, "$", ["$"])
]);
dpda_design = new DPDADesign(1, "$", [3], rulebook);
console.log(dpda_design.accepts("abmba"));
console.log(dpda_design.accepts("babbamabbab"));
console.log(dpda_design.accepts("abmb"));
console.log(dpda_design.accepts("baambaa"));
