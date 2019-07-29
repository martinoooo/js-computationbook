import FARule from "./fa_rule";
import DFARulebook from "./dfa_rulebook";
import DFA from "./dfa";
import DFADesign from "./dfa_design";

const rulebook = new DFARulebook([
  new FARule(1, "a", 2),
  new FARule(1, "b", 1),
  new FARule(2, "a", 2),
  new FARule(2, "b", 3),
  new FARule(3, "a", 3),
  new FARule(3, "b", 3)
]);

console.log(rulebook);
console.log(rulebook.next_state(1, "a"));
console.log(rulebook.next_state(1, "b"));
console.log(rulebook.next_state(2, "b"));

console.log(new DFA(1, [1, 3], rulebook).accepting());

let dfa = new DFA(1, [3], rulebook);
console.log(dfa.accepting());
dfa.read_character("b");
console.log(dfa.accepting());
for (let i = 0; i < 3; i++) dfa.read_character("a");
console.log(dfa.accepting());
dfa.read_character("b");
console.log(dfa.accepting());

dfa = new DFA(1, [3], rulebook);
console.log(dfa.accepting());
dfa.read_string("baaab");
console.log(dfa.accepting());

const dfa_design = new DFADesign(1, [3], rulebook);
console.log(dfa_design);
console.log(dfa_design.accepts("a"));
console.log(dfa_design.accepts("baa"));
console.log(dfa_design.accepts("baba"));
