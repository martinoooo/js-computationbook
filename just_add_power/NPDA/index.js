import assert from "assert";
import Stack from "../stack";
import PDARule from "../pda_rule";
import PDAConfiguration from "../pda_configuration";
import DPDARulebook from "../DPDA/dpda_rulebook";
// import DPDA from "./dpda";
import DPDADesign from "../DPDA/dpda_design";
import NPDARulebook from "./npda_rulebook";
import NPDA from "./npda";
import NPDADesign from "./npda_design";
// import LexicalAnalyzer, { GRAMMAR } from "./lexical_analyzer";

console.log("-----------------------");
// 识别a和b的字符个数是否相等
let rulebook = new DPDARulebook([
  new PDARule(1, "a", 2, "$", ["a", "$"]),
  new PDARule(1, "b", 2, "$", ["b", "$"]),
  new PDARule(2, "a", 2, "a", ["a", "a"]),
  new PDARule(2, "b", 2, "b", ["b", "b"]),
  new PDARule(2, "a", 2, "b", []),
  new PDARule(2, "b", 2, "a", []),
  new PDARule(2, null, 1, "$", ["$"])
]);
console.log(rulebook);
let dpda_design = new DPDADesign(1, "$", [1], rulebook);
console.log(dpda_design);
assert.strictEqual(dpda_design.accepts("ababab"), true);
assert.strictEqual(dpda_design.accepts("bbbaaaab"), true);
assert.strictEqual(dpda_design.accepts("baa"), false);

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
assert.strictEqual(dpda_design.accepts("abmba"), true);
assert.strictEqual(dpda_design.accepts("babbamabbab"), true);
assert.strictEqual(dpda_design.accepts("abmb"), false);
assert.strictEqual(dpda_design.accepts("baambaa"), false);

console.log("-----------------------");
rulebook = new NPDARulebook([
  new PDARule(1, "a", 1, "$", ["a", "$"]),
  new PDARule(1, "a", 1, "a", ["a", "a"]),
  new PDARule(1, "a", 1, "b", ["a", "b"]),
  new PDARule(1, "b", 1, "$", ["b", "$"]),
  new PDARule(1, "b", 1, "a", ["b", "a"]),
  new PDARule(1, "b", 1, "b", ["b", "b"]),
  new PDARule(1, null, 2, "$", ["$"]),
  new PDARule(1, null, 2, "a", ["a"]),
  new PDARule(1, null, 2, "b", ["b"]),
  new PDARule(2, "a", 2, "a", []),
  new PDARule(2, "b", 2, "b", []),
  new PDARule(2, null, 3, "$", ["$"])
]);
let configuration = new PDAConfiguration(1, new Stack(["$"]));
let npda = new NPDA([configuration], [3], rulebook);
assert.strictEqual(npda.accepting(), true);
console.log(npda.current_configurations);

npda.read_string("abb");
assert.strictEqual(npda.accepting(), false);
console.log(npda.current_configurations);

npda.read_character("a");
assert.strictEqual(npda.accepting(), true);
console.log(npda.current_configurations);

console.log("-----------------------");
let npda_design = new NPDADesign(1, "$", [3], rulebook);
assert.strictEqual(npda_design.accepts("abba"), true);
assert.strictEqual(npda_design.accepts("babbaabbab"), true);
assert.strictEqual(npda_design.accepts("abb"), false);
assert.strictEqual(npda_design.accepts("baabaa"), false);

// console.log("-----------------------");
// console.log(new LexicalAnalyzer("y = x * 7").analyze()); // ["v", "=", "v", "*", "n"]
// console.log(new LexicalAnalyzer("while (x < 5) { x = x * 3 }").analyze());
// // ["w", "(", "v", "<", "n", ")", "{", "v", "=", "v", "*", "n", "}"]
// console.log(
//   new LexicalAnalyzer(
//     "if (x < 10) { y = true; x = 0 } else { do-nothing }"
//   ).analyze()
// );
// // ["i", "(", "v", "<", "n", ")", "{", "v", "=", "b", ";", "v", "=", "n", "}", "e", "{", "d", "}"]

// console.log("-----------------------");
// let start_rule = new PDARule(1, null, 2, "$", ["S", "$"]);
// let symbol_rules = [
//   // # <statement> ::= <while> | <assign>
//   new PDARule(2, null, 2, "S", ["W"]),
//   new PDARule(2, null, 2, "S", ["A"]),
//   // # <while> ::= 'w' '(' <expression> ')' '{' <statement> '}'
//   new PDARule(2, null, 2, "W", ["w", "(", "E", ")", "{", "S", "}"]),
//   // # <assign> ::= 'v' '=' <expression>
//   new PDARule(2, null, 2, "A", ["v", "=", "E"]),
//   // # <expression> ::= <less-than>
//   new PDARule(2, null, 2, "E", ["L"]),
//   // # <less-than> ::= <multiply> '<' <less-than> | <multiply>
//   new PDARule(2, null, 2, "L", ["M", "<", "L"]),
//   new PDARule(2, null, 2, "L", ["M"]),
//   // # <multiply> ::= <term> '*' <multiply> | <term>
//   new PDARule(2, null, 2, "M", ["T", "*", "M"]),
//   new PDARule(2, null, 2, "M", ["T"]),
//   // # <term> ::= 'n' | 'v'
//   new PDARule(2, null, 2, "T", ["n"]),
//   new PDARule(2, null, 2, "T", ["v"])
// ];
// let token_rules = GRAMMAR.map(rule => {
//   return new PDARule(2, rule.token, 2, rule.token, []);
// });
// let stop_rule = new PDARule(2, null, 3, "$", ["$"]);
// rulebook = new NPDARulebook(
//   [start_rule, stop_rule].concat(symbol_rules, token_rules)
// );
// npda_design = new NPDADesign(1, "$", [3], rulebook);
// let token_string = new LexicalAnalyzer("while (x < 5) { x = x * 3 }")
//   .analyze()
//   .join("");
// console.log(token_string); // w(v<n){v=v*n}
// console.log(npda_design.accepts(token_string)); // true
// console.log(
//   npda_design.accepts(
//     new LexicalAnalyzer("while (x < 5 x = x * }").analyze().join("")
//   )
// ); // false
