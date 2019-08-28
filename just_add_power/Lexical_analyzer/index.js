import assert from "assert";
import PDARule from "../pda_rule";
import NPDARulebook from "../NPDA/npda_rulebook";
import NPDADesign from "../NPDA/npda_design";
import LexicalAnalyzer, { GRAMMAR } from "./lexical_analyzer";

console.log("-----------------------");
assert.deepEqual(new LexicalAnalyzer("y = x * 7").analyze(), [
  "v",
  "=",
  "v",
  "*",
  "n"
]);
assert.deepEqual(new LexicalAnalyzer("while (x < 5) { x = x * 3 }").analyze(), [
  "w",
  "(",
  "v",
  "<",
  "n",
  ")",
  "{",
  "v",
  "=",
  "v",
  "*",
  "n",
  "}"
]);
assert.deepEqual(
  new LexicalAnalyzer(
    "if (x < 10) { y = true; x = 0 } else { do-nothing }"
  ).analyze(),
  [
    "i",
    "(",
    "v",
    "<",
    "n",
    ")",
    "{",
    "v",
    "=",
    "b",
    ";",
    "v",
    "=",
    "n",
    "}",
    "e",
    "{",
    "d",
    "}"
  ]
);

console.log("-----------------------");
let start_rule = new PDARule(1, null, 2, "$", ["S", "$"]);
let symbol_rules = [
  // # <statement> ::= <while> | <assign>
  new PDARule(2, null, 2, "S", ["W"]),
  new PDARule(2, null, 2, "S", ["A"]),
  // # <while> ::= 'w' '(' <expression> ')' '{' <statement> '}'
  new PDARule(2, null, 2, "W", ["w", "(", "E", ")", "{", "S", "}"]),
  // # <assign> ::= 'v' '=' <expression>
  new PDARule(2, null, 2, "A", ["v", "=", "E"]),
  // # <expression> ::= <less-than>
  new PDARule(2, null, 2, "E", ["L"]),
  // # <less-than> ::= <multiply> '<' <less-than> | <multiply>
  new PDARule(2, null, 2, "L", ["M", "<", "L"]),
  new PDARule(2, null, 2, "L", ["M"]),
  new PDARule(2, null, 2, "L", ["A", "<", "L"]),
  new PDARule(2, null, 2, "L", ["A"]),
  // # <multiply> ::= <term> '*' <multiply> | <term>
  new PDARule(2, null, 2, "M", ["T", "*", "M"]),
  new PDARule(2, null, 2, "M", ["T"]),
  // # <multiply> ::= <term> '*' <multiply> | <term>
  new PDARule(2, null, 2, "A", ["T", "+", "A"]),
  new PDARule(2, null, 2, "A", ["T"]),
  // # <term> ::= 'n' | 'v'
  new PDARule(2, null, 2, "T", ["n"]),
  new PDARule(2, null, 2, "T", ["v"])
];
let token_rules = GRAMMAR.map(rule => {
  return new PDARule(2, rule.token, 2, rule.token, []);
});
let stop_rule = new PDARule(2, null, 3, "$", ["$"]);
let rulebook = new NPDARulebook(
  [start_rule, stop_rule].concat(symbol_rules, token_rules)
);
let npda_design = new NPDADesign(1, "$", [3], rulebook);
let token_string = new LexicalAnalyzer("while (x < 5) { x = x * 3 }")
  .analyze()
  .join("");
console.log(token_string); // w(v<n){v=v*n}
console.log(npda_design.accepts(token_string)); // true
console.log(
  npda_design.accepts(
    new LexicalAnalyzer("while (x < 5 x = x * }").analyze().join("")
  )
); // false
