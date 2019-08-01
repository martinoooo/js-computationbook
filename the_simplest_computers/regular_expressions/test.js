import Repeat from "./repeat";
import Choose from "./choose";
import Concatenate from "./concatenate";
import Literal from "./literal";
import Empty from "./empty";

let pattern = new Repeat(
  new Choose(
    new Concatenate(new Literal("a"), new Literal("b")),
    new Literal("a")
  )
);
console.log(pattern);

let nfa_design = new Empty().to_nfa_design();
console.log(nfa_design);
console.log(nfa_design.accepts("")); // true
console.log(nfa_design.accepts("a")); // false

console.log("------------------------");

nfa_design = new Literal("a").to_nfa_design();
console.log(nfa_design);
console.log(nfa_design.accepts("")); // false
console.log(nfa_design.accepts("a")); // true
console.log(nfa_design.accepts("b")); // false

console.log("------------------------");

console.log(new Empty().matches("a")); // false
console.log(new Literal("a").matches("a")); // true

console.log("------------------------");

pattern = new Concatenate(new Literal("a"), new Literal("b"));
console.log(pattern);
console.log(pattern.matches("a")); // false
console.log(pattern.matches("ab")); // true
console.log(pattern.matches("abc")); // false

console.log("------------------------");
pattern = new Concatenate(
  new Literal("a"),
  new Concatenate(new Literal("b"), new Literal("c"))
);
console.log(pattern);
console.log(pattern.matches("a")); // => false
console.log(pattern.matches("ab")); //  => false
console.log(pattern.matches("abc")); //  => true

console.log("------------------------");
pattern = new Choose(new Literal("a"), new Literal("b"));
console.log(pattern);
console.log(pattern.matches("a")); // => true
console.log(pattern.matches("b")); //  => true
console.log(pattern.matches("c")); // => false

console.log("------------------------");
pattern = new Repeat(new Literal("a")); // => /a*/
console.log(pattern);
console.log(pattern.matches("")); // => true
console.log(pattern.matches("a")); // => true
console.log(pattern.matches("aaaa")); //  => true
console.log(pattern.matches("b")); // => false

console.log("------------------------");
pattern = new Repeat(
  new Concatenate(new Literal("a"), new Choose(new Empty(), new Literal("b")))
);
console.log(pattern); // => /(a(|b))*/
console.log(pattern.matches("")); // => true
console.log(pattern.matches("a")); // => true
console.log(pattern.matches("ab")); // => true
console.log(pattern.matches("aba")); // => true
console.log(pattern.matches("abab")); // => true
console.log(pattern.matches("abaab")); //  => true
console.log(pattern.matches("abba")); //  => false
