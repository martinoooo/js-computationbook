import Repeat from "./repeat";
import Choose from "./choose";
import Concatenate from "./concatenate";
import Literal from "./literal";
import Empty from "./empty";

const pattern = new Repeat(
  new Choose(
    new Concatenate(new Literal("a"), new Literal("b")),
    new Literal("a")
  )
);
console.log(pattern);

let nfa_design = new Empty().to_nfa_design();
console.log(nfa_design);
console.log(nfa_design.accepts(""));
console.log(nfa_design.accepts("a"));
nfa_design = new Literal("a").to_nfa_design();
console.log(nfa_design);
console.log(nfa_design.accepts(""));
console.log(nfa_design.accepts("a"));
console.log(nfa_design.accepts("b"));

console.log(new Empty().matches("a"));
console.log(new Literal("a").matches("a"));
