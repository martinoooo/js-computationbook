import Number from "./number";
import Multiply from "./multiply";
import Add from "./add";
// import Machine from "./machine";
import LessThan from "./less_than";
import Variable from "./variable";
import Assign from "./assign";
// import If from "./if";
// import Boolean from "./boolean";
// import DoNothing from "./do_nothing";
import Sequence from "./sequence";
import While from "./while";

console.log(new Number(23).evaluate({}));

console.log(new Variable("x").evaluate({ x: new Number(23) }));

const test1 = new LessThan(
  new Add(new Variable("x"), new Number(2)),
  new Variable("y")
).evaluate({ x: new Number(2), y: new Number(5) });
console.log(test1);

const test2 = new Sequence(
  new Assign("x", new Add(new Number(1), new Number(1))),
  new Assign("y", new Add(new Variable("x"), new Number(3)))
);
console.log(test2);
console.log(test2.evaluate({}));

const test3 = new While(
  new LessThan(new Variable("x"), new Number(5)),
  new Assign("x", new Multiply(new Variable("x"), new Number(3)))
);
console.log(test3);
console.log(test3.evaluate({ x: new Number(1) }));
