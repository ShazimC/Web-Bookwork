/*
  todo: Chapter 10 - Modules
  The ideal program has a crystal-clear structure. The way it works is easy
  to explain, and each part plays a well-defined role.
*/
// * Fireship 100 secs
// a module is nothin more than a file that exports its own code
// es modules are the latest way to do this, requireJS is traditional/depracating
export default () => {
  console.log("this is a module");
};
// Sam Ming cheatsheet: https://www.youtube.com/redirect?q=https%3A%2F%2Fwww.samanthaming.com%2Ftidbits%2F79-module-cheatsheet&redir_token=QUFFLUhqbExIeVdoZjk2SHJaWmt6eU9Ub0lrY2I5dGh6d3xBQ3Jtc0trN1EwdVVpbmhaSmpPMUV1SjVqQ3dBYll3VGJaTVVTVzE3R284ZlVkeEZIV09TcmhBc3RXaW1JY1EwM0VYbzJFN2g5UzJYYjBaWVgyb0trYi1jeXo2bnlhbmctbWRYYWc3LUtCQWxYS1JWdHBTUzB3dw%3D%3D&event=video_description&v=qgRUr-YUk1Q
// * name export
export const name = "value";
import { name } from "..";
// * default export
export default "value";
import callItWhatever from "...";
// * rename export
export { name as newName };
import { newName } from "...";
// * export list + rename
export { name1, name2 as newName2 };
import { name1 as newName1, newName2 } from "...";

const weekDay = (function () {
  const names = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return {
    name(number) {
      return names[number];
    },
    number(name) {
      return names.indexOf(name);
    },
  };
})();
let plusOne = Function("n", "return n + 1;");
console.log(plusOne(4));
/* 
  * CommonJS
  - NodeJS uses it and is the most common module type among npm packages.
  - const module = require('where module is located');
*/
exports.formatDate = function (date, format) {
  return "blah blah";
};
const { formatDate } = require("./format-date");
/* 
  * ECMAScript Modules
  - commonJS is janky, and the imported dependencies are
  imported via require which as a function doesn't offer
  details on the dependencies when imported
  - ES Modules offers a more robust, easier to read, and
  detail offering 
*/
import ordinal from "ordinal";
import { days, months } from "date-names";
export function formatDate(date, format) {
  return "bla bla";
}
export default ["Winter", "Spring", "Summer", "Autumn"];
import seasons from "./ch10";
// you can rename modules as you import them
import { days as dayNames } from "date-names";
console.log(dayNames.length);

/* 
  * Building and Bundlers
  - Fetching a single big file tends to be faster than fetching
      a lot of tiny ones.
  - Bundlers are tools that roll their programs (which they 
      painstakingly split into modules) back into a single big file
      before publishing it to the web.
  - Minifiers are tools that take a JS program and make it
      smaller by automatically removing comments & whitespace,
      renaming bindings, and replacing pieces of code with
      equivalent code that take up less space.
*/

/* 
    * Module Design
    - The best way to learn the value of well-structured design
        is to read and work on a lot of programs and notice what
        works and what doesn't.
*/

/* 
  * A Modular Robot
  - which of the listed bindings listed should be modules
  * randomRobot, buildGraph, runRobot, randomPick, findRoute
  - which module would depend on which module
  * randomRobot would depend on randomPick, findRoute would depend on buildGraph
  - what whould their interfaces look like
  - which pieces can probably be found as an NPM package already
  * Graphs can be found as npm package. JS has native random stuff.
  - would you prefer to use the npm package or write them yourself & why.
  * Would prefer to write own if what I need is small and simple.
*/

/* 
  * Roads Module
  - write a commonJS module, based on the ch7 example that contains
  the array of roads and exports the graph data structure representing them
  as roadGraph. 
  - It should depend on a module ./graph, which exports a function 
  buildGraph that is used to build the graph. 
  - This function expects an array of two-element arrays (the start and 
  endpoints of the roads).
*/
// * ./graph.js module
{
  export default buildGraph = (roads) => {
    //...code
  };
}
const buildGraph = require("./graph");
const roads = [];
const graph = buildGraph(roads);
exports.roadGraph = graph;
