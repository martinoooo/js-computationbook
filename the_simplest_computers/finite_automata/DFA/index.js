import assert from "assert";
import FARule from "../fa_rule";
import DFARulebook from "./dfa_rulebook";
import DFA from "./dfa";
import DFADesign from "./dfa_design";

let rulebook = new DFARulebook([
  new FARule(1, "a", 2),
  new FARule(1, "b", 1),
  new FARule(2, "a", 2),
  new FARule(2, "b", 3),
  new FARule(3, "a", 3),
  new FARule(3, "b", 3)
]);
console.log(rulebook);
assert.strictEqual(rulebook.next_state(1, "a"), 2);
assert.strictEqual(rulebook.next_state(1, "b"), 1);
assert.strictEqual(rulebook.next_state(2, "b"), 3);

console.log("----判断DFA是否处于可接受状态  --------");
assert.strictEqual(new DFA(1, [1, 3], rulebook).accepting(), true);
assert.strictEqual(new DFA(1, [3], rulebook).accepting(), false);

console.log("----DFA读取字符，改变状态--------");
let dfa = new DFA(1, [3], rulebook);
assert.strictEqual(dfa.accepting(), false);
dfa.read_character("b");
assert.strictEqual(dfa.accepting(), false);
for (let i = 0; i < 3; i++) dfa.read_character("a");
assert.strictEqual(dfa.accepting(), false);
dfa.read_character("b");
assert.strictEqual(dfa.accepting(), true);

console.log("-----DFA读取字符串，改变状态-------");
dfa = new DFA(1, [3], rulebook);
assert.strictEqual(dfa.accepting(), false);
dfa.read_string("baaab");
assert.strictEqual(dfa.accepting(), true);

console.log("-----DFADesign-------");
let dfa_design = new DFADesign(1, [3], rulebook);
console.log(dfa_design);
assert.strictEqual(dfa_design.accepts("a"), false);
assert.strictEqual(dfa_design.accepts("baa"), false);
assert.strictEqual(dfa_design.accepts("baba"), true);
