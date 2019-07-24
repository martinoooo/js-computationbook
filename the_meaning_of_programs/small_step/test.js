import Number from "./number";
import Multiply from "./multiply";
import Add from "./add";
import Machine from "./machine";
import LessThan from "./less_than";
import Variable from "./variable";
import Assign from "./assign";
import If from "./if";
import Boolean from "./boolean";
import DoNothing from "./do_nothing";
import Sequence from "./sequence";
import While from "./while";

let expression = new Add(
  new Multiply(new Number(1), new Number(2)),
  new Multiply(new Number(3), new Number(4))
);

const run = new Machine(expression);
run.run();

new Machine(
  new LessThan(new Number(5), new Add(new Number(2), new Number(2)))
).run();

new Machine(new Add(new Variable("x"), new Number(2)), {
  x: new Number(3),
  y: new Number(4)
}).run();

let statement = new Assign("x", new Add(new Variable("x"), new Number(1)));
let environment = { x: new Number(2) };
console.log([statement, environment]);

[statement, environment] = statement.reduce(environment);
console.log([statement, environment]);

[statement, environment] = statement.reduce(environment);
console.log([statement, environment]);

[statement, environment] = statement.reduce(environment);
console.log([statement, environment]);

new Machine(new Assign("x", new Add(new Variable("x"), new Number(1))), {
  x: new Number(2)
}).run();

new Machine(
  new If(
    new Variable("x"),
    new Assign("y", new Number(1)),
    new Assign("y", new Number(2))
  ),
  { x: new Boolean(true) }
).run();

new Machine(
  new If(new Variable("x"), new Assign("y", new Number(1)), new DoNothing()),
  { x: new Boolean(false) }
).run();

new Machine(
  new Sequence(
    new Assign("x", new Add(new Number(1), new Number(1))),
    new Assign("y", new Add(new Variable("x"), new Number(3)))
  ),
  {}
).run();

new Machine(
  new While(
    new LessThan(new Variable("x"), new Number(5)),
    new Assign("x", new Multiply(new Variable("x"), new Number(3)))
  ),
  { x: new Number(1) }
).run();
