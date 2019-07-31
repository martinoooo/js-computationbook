import FARule from "./fa_rule";
import DFARulebook from "./dfa_rulebook";
import DFA from "./dfa";
import DFADesign from "./dfa_design";
import NFARulebook from "./nfa_rulebook";
import NFA from "./nfa";
import NFADesign from "./nfa_design";

// const rulebook = new DFARulebook([
//   new FARule(1, "a", 2),
//   new FARule(1, "b", 1),
//   new FARule(2, "a", 2),
//   new FARule(2, "b", 3),
//   new FARule(3, "a", 3),
//   new FARule(3, "b", 3)
// ]);

// console.log(rulebook);
// console.log(rulebook.next_state(1, "a"));
// console.log(rulebook.next_state(1, "b"));
// console.log(rulebook.next_state(2, "b"));

// console.log(new DFA(1, [1, 3], rulebook).accepting());

// let dfa = new DFA(1, [3], rulebook);
// console.log(dfa.accepting());
// dfa.read_character("b");
// console.log(dfa.accepting());
// for (let i = 0; i < 3; i++) dfa.read_character("a");
// console.log(dfa.accepting());
// dfa.read_character("b");
// console.log(dfa.accepting());

// dfa = new DFA(1, [3], rulebook);
// console.log(dfa.accepting());
// dfa.read_string("baaab");
// console.log(dfa.accepting());

// const dfa_design = new DFADesign(1, [3], rulebook);
// console.log(dfa_design);
// console.log(dfa_design.accepts("a"));
// console.log(dfa_design.accepts("baa"));
// console.log(dfa_design.accepts("baba"));

// let rulebook = new NFARulebook([
//   new FARule(1, "a", 1),
//   new FARule(1, "b", 1),
//   new FARule(1, "b", 2),
//   new FARule(2, "a", 3),
//   new FARule(2, "b", 3),
//   new FARule(3, "a", 4),
//   new FARule(3, "b", 4)
// ]);
// console.log(rulebook);

// console.log(rulebook.next_states([1], "b"));
// console.log(rulebook.next_states([1, 2], "a"));
// console.log(rulebook.next_states([1, 3], "b"));

// console.log(new NFA([1], [4], rulebook).accepting());
// console.log(new NFA([1, 2, 4], [4], rulebook).accepting());

// let nfa = new NFA([1], [4], rulebook);
// console.log(nfa);
// console.log(nfa.accepting());
// nfa.read_character("b");
// console.log(nfa.accepting());
// nfa.read_character("a");
// console.log(nfa.accepting());
// nfa.read_character("b");
// console.log(nfa.accepting());

// nfa = new NFA([1], [4], rulebook);
// console.log(nfa.accepting());
// nfa.read_string("bbbbb");
// console.log(nfa.accepting());

// let nfa_design = new NFADesign(1, [4], rulebook);
// console.log(nfa_design);
// console.log(nfa_design.accepts("bab"));
// console.log(nfa_design.accepts("bbbbb"));
// console.log(nfa_design.accepts("bbabb"));

let rulebook = new NFARulebook([
  new FARule(1, null, 2),
  new FARule(1, null, 4),
  new FARule(2, "a", 3),
  new FARule(3, "a", 2),
  new FARule(4, "a", 5),
  new FARule(5, "a", 6),
  new FARule(6, "a", 4)
]);
// console.log(rulebook);
// console.log(rulebook.next_states([1], null));
// console.log(rulebook.follow_free_moves([1]));

let nfa_design = new NFADesign(1, [2, 4], rulebook);
console.log(nfa_design);
console.log(nfa_design.accepts("aa"));
console.log(nfa_design.accepts("aaa"));
console.log(nfa_design.accepts("aaaaa"));
console.log(nfa_design.accepts("aaaaaa"));
