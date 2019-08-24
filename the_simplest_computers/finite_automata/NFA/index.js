import assert from "assert";
import FARule from "../fa_rule";
// import DFARulebook from "./dfa_rulebook";
// import DFA from "./dfa";
// import DFADesign from "./dfa_design";
import NFARulebook from "./nfa_rulebook";
import NFA from "./nfa";
import NFADesign from "./nfa_design";
// import NFASimulation from "./nfa_simulation";

console.log("------------");
let rulebook = new NFARulebook([
  new FARule(1, "a", 1),
  new FARule(1, "b", 1),
  new FARule(1, "b", 2),
  new FARule(2, "a", 3),
  new FARule(2, "b", 3),
  new FARule(3, "a", 4),
  new FARule(3, "b", 4)
]);
console.log(rulebook);
assert.deepEqual(rulebook.next_states([1], "b"), [1, 2]);
assert.deepEqual(rulebook.next_states([1, 2], "a"), [1, 3]);
assert.deepEqual(rulebook.next_states([1, 3], "b"), [1, 2, 4]);

console.log("-----NFA是否为接受状态-------");
assert.strictEqual(new NFA([1], [4], rulebook).accepting(), false);
assert.strictEqual(new NFA([1, 2, 4], [4], rulebook).accepting(), true);

console.log("----NFA读取字符，改变状态--------");
let nfa = new NFA([1], [4], rulebook);
console.log(nfa);
assert.strictEqual(nfa.accepting(), false);
nfa.read_character("b");
assert.strictEqual(nfa.accepting(), false);
nfa.read_character("a");
assert.strictEqual(nfa.accepting(), false);
nfa.read_character("b");
assert.strictEqual(nfa.accepting(), true);

console.log("-----DFA读取字符串，改变状态-------");
nfa = new NFA([1], [4], rulebook);
assert.strictEqual(nfa.accepting(), false);
nfa.read_string("bbbbb");
assert.strictEqual(nfa.accepting(), true);

console.log("-----NFADesign-------");
let nfa_design = new NFADesign(1, [4], rulebook);
console.log(nfa_design);
assert.strictEqual(nfa_design.accepts("bab"), true);
assert.strictEqual(nfa_design.accepts("bbbbb"), true);
assert.strictEqual(nfa_design.accepts("bbabb"), false);

console.log("------自由移动------");
rulebook = new NFARulebook([
  new FARule(1, null, 2),
  new FARule(1, null, 4),
  new FARule(2, "a", 3),
  new FARule(3, "a", 2),
  new FARule(4, "a", 5),
  new FARule(5, "a", 6),
  new FARule(6, "a", 4)
]);
console.log(rulebook);
assert.deepEqual(rulebook.next_states([1], null), [2, 4]);
assert.deepEqual(rulebook.follow_free_moves([1]), [1, 2, 4]);
nfa_design = new NFADesign(1, [2, 4], rulebook);
assert.deepEqual(nfa_design.accepts("aa"), true);
assert.deepEqual(nfa_design.accepts("aaa"), true);
assert.deepEqual(nfa_design.accepts("aaaaa"), false);
assert.deepEqual(nfa_design.accepts("aaaaaa"), true);

// console.log("------------");
// rulebook = new NFARulebook([
//   new FARule(1, "a", 1),
//   new FARule(1, "a", 2),
//   new FARule(1, null, 2),
//   new FARule(2, "b", 3),
//   new FARule(3, "b", 1),
//   new FARule(3, null, 2)
// ]);
// console.log(rulebook);
// nfa_design = new NFADesign(1, [3], rulebook);
// console.log(nfa_design);
// console.log(nfa_design.to_nfa().current_states);
// console.log(nfa_design.to_nfa([2]).current_states);
// console.log(nfa_design.to_nfa([3]).current_states);
// nfa = nfa_design.to_nfa([2, 3]);
// console.log(nfa);
// nfa.read_character("b");
// console.log(nfa.current_states);

// console.log("------------");
// let simulation = new NFASimulation(nfa_design);
// console.log(simulation);
// console.log(simulation.next_state([1, 2], "a"));
// console.log(simulation.next_state([1, 2], "b")); //  => #<Set: {3, 2}>
// console.log(simulation.next_state([3, 2], "b")); // => #<Set: {1, 3, 2}>
// console.log(simulation.next_state([1, 3, 2], "b")); //  => #<Set: {1, 3, 2}>
// console.log(simulation.next_state([1, 3, 2], "a")); // => #<Set: {1, 2}>

// console.log("------------");
// console.log(rulebook.alphabet());
// console.log(simulation.rules_for([1, 2]));
// console.log(simulation.rules_for([3, 2]));

// console.log("------------");
// const start_state = nfa_design.to_nfa().current_states;
// console.log(start_state);
// console.log(simulation.discover_states_and_rules([start_state]));

// console.log("------------");
// rulebook = new NFARulebook([
//   new FARule(0, "(", 1),
//   new FARule(1, ")", 0),
//   new FARule(1, "(", 2),
//   new FARule(2, ")", 1),
//   new FARule(2, "(", 3),
//   new FARule(3, ")", 2)
// ]);
// console.log(rulebook);
// nfa_design = new NFADesign(0, [0], rulebook);
// console.log(nfa_design);
// console.log(nfa_design.accepts("(()")); // => false
// console.log(nfa_design.accepts("())")); // => false
// console.log(nfa_design.accepts("(())")); // => true
// console.log(nfa_design.accepts("(()(()()))")); // => true
// console.log(nfa_design.accepts("(((())))")); // => true
