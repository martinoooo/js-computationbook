import assert from "assert";
import Repeat from "./repeat";
import Choose from "./choose";
import Concatenate from "./concatenate";
import Literal from "./literal";
import Empty from "./empty";

console.log("--------手工构建正则表达式的树---------");
let pattern = new Repeat(
  new Choose(
    new Concatenate(new Literal("a"), new Literal("b")),
    new Literal("a")
  )
);
console.log(pattern); // /(ab|a)*/

console.log("--------Empty转化成NFA---------");
let nfa_design = new Empty().to_nfa_design();
console.log(nfa_design);
assert.strictEqual(nfa_design.accepts(""), true);
assert.strictEqual(nfa_design.accepts("a"), false);

console.log("--------Literal转化成NFA----------------");
nfa_design = new Literal("a").to_nfa_design();
console.log(nfa_design);
assert.strictEqual(nfa_design.accepts(""), false);
assert.strictEqual(nfa_design.accepts("a"), true);
assert.strictEqual(nfa_design.accepts("b"), false);

console.log("-------.to_nfa_design().accepts()封装成一个方法-------");
assert.strictEqual(new Empty().matches("a"), false);
assert.strictEqual(new Literal("a").matches("a"), true);

console.log("-------Concatenate转化成NFA--------");
pattern = new Concatenate(new Literal("a"), new Literal("b"));
console.log(pattern);
assert.strictEqual(pattern.matches("a"), false);
assert.strictEqual(pattern.matches("ab"), true);
assert.strictEqual(pattern.matches("abc"), false);
// 转换过程是递归的
pattern = new Concatenate(
  new Literal("a"),
  new Concatenate(new Literal("b"), new Literal("c"))
);
console.log(pattern);
assert.strictEqual(pattern.matches("a"), false);
assert.strictEqual(pattern.matches("ab"), false);
assert.strictEqual(pattern.matches("abc"), true);

console.log("-------Choose转化成NFA-----------------");
pattern = new Choose(new Literal("a"), new Literal("b"));
console.log(pattern);
assert.strictEqual(pattern.matches("a"), true);
assert.strictEqual(pattern.matches("b"), true);
assert.strictEqual(pattern.matches("c"), false);

console.log("-------Repeat转化成NFA-----------------");
pattern = new Repeat(new Literal("a")); // => /a*/
console.log(pattern);
assert.strictEqual(pattern.matches(""), true);
assert.strictEqual(pattern.matches("a"), true);
assert.strictEqual(pattern.matches("aaaa"), true);
assert.strictEqual(pattern.matches("b"), false);

console.log("--------构建复杂的模式匹配字符串----------------");
pattern = new Repeat(
  new Concatenate(new Literal("a"), new Choose(new Empty(), new Literal("b")))
);
console.log(pattern); // => /(a(|b))*/
assert.strictEqual(pattern.matches(""), true);
assert.strictEqual(pattern.matches("a"), true);
assert.strictEqual(pattern.matches("ab"), true);
assert.strictEqual(pattern.matches("aba"), true);
assert.strictEqual(pattern.matches("abab"), true);
assert.strictEqual(pattern.matches("abaab"), true);
assert.strictEqual(pattern.matches("abba"), false);
