import Number from "./number";
import Multiply from "./multiply";
import Add from "./add";
import Machine from "./machine";
import LessThan from "./less_than";
import Variable from "./variable";

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
