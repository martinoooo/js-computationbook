import assert from "assert";
import Number from "./expression/number";
import Multiply from "./expression/multiply";
import Add from "./expression/add";
// import Machine from "./machine";
import LessThan from "./expression/less_than";
import Variable from "./expression/variable";
import Assign from "./statement/assign";
// import If from "./if";
import Boolean from "./expression/boolean";
// import DoNothing from "./do_nothing";
import Sequence from "./statement/sequence";
import While from "./statement/while";

console.log("-------表达式的大步语义----------");
assert.deepEqual(new Number(23).evaluate({}), new Number(23), "");

assert.deepEqual(
  new Variable("x").evaluate({ x: new Number(23) }),
  new Number(23),
  ""
);

let expression = new LessThan(
  new Add(new Variable("x"), new Number(2)),
  new Variable("y")
).evaluate({ x: new Number(2), y: new Number(5) });
assert.deepEqual(expression, new Boolean(true), "");

console.log("-------语句的大步语义----------");
let statement = new Sequence(
  new Assign("x", new Add(new Number(1), new Number(1))),
  new Assign("y", new Add(new Variable("x"), new Number(3)))
);
console.log(statement); // <<x = 1 + 1 ; y = x + 3 >
console.log(statement.evaluate({}));
assert.deepEqual(statement.evaluate({}), {
  x: new Number(2),
  y: new Number(5)
});

statement = new While(
  new LessThan(new Variable("x"), new Number(5)),
  new Assign("x", new Multiply(new Variable("x"), new Number(3)))
);
console.log(statement); // <<while (x < 5) { x = x * 3 } >>
assert.deepEqual(statement.evaluate({ x: new Number(1) }), {
  x: new Number(9)
});
