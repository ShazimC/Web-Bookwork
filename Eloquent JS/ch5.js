function repeat(n, action) {
	for (let i = 0; i < n; i++) {
		action(i);
	}
}
repeat(5, console.log);
repeat(5, (i) => {
	let random = i * Math.random();
	console.log(random);
});

/* 
    * Higher-Order Functions
    - Functions that operate on other functions as args/out.
    - allow us to abstract over actions not just values.
*/
function noisy(funco) {
	return (...argies) => {
		console.log("calling with", argies);
		let result = funco(...argies);
		console.log("called with", argies, " returned", result);
		return result;
	};
}
noisy(Math.min)(3, 2, 1);

function unless(test, then) {
	if (!test) then();
	// you can pass functions as args and then call them on condition
}
repeat(3, (n) => {
	unless(n % 2 === 1, () => {
		console.log(n, "is even");
	});
});

/* 
    * Script Data Set
    - Higher-order functions shine in data processing.
*/
function filterScripts(array, test) {
	let passed = [];
	for (let element of array) {
		if (test(element)) {
			passed.push(element);
		}
	}
	return passed;
}
const SCRIPTS = [];
filterScripts(SCRIPTS, (script) => script.living);
SCRIPTS.filter((script) => script.living);

/*
 * Transforming with map
 */
function map(array, transform) {
	let mapped = [];
	for (let element of array) {
		mapped.push(transform(element));
	}
	return mapped;
}
let rtlScripts = SCRIPTS.filter((s) => s.direction === "rtl");
map(rtlScripts, (s) => s.name);
rtlScripts.map((s) => s.name);
// -> ["Adlam", "Arabic", "Imperial Aramaic", ...]

/* 
    * Summarizing with reduce
    ? How does reduce work?
    ! Compute a single value from an array.
    - also called fold, It builds a value by repeatedly taking a single
    element from the array and combining it with the current value. When
    summing numbers, you'd start with the number zero and, for each element,
    add that to the sum.
    ! Params for reduce are: array, func to perform repeatedly, & start.
*/
function reduce(array, combine, start) {
	let current = start;
	for (let element of array) {
		current = combine(current, element);
	}
	return current;
}
console.log(reduce([1, 2, 3, 4], (a, b) => a + b, 0));
console.log(
	[1, 2, 3, 4].reduce((a, b, index, array) => {
		console.log(index, array);
		return a - b;
	})
);
function characterCount(script) {
	return script.ranges.reduce((count, [from, to]) => {
		return count + (to - from);
	}, 0);
}
let array = SCRIPTS.reduce((currentScript, nextScript) => {
	return characterCount(currentScript) < characterCount(nextScript)
		? nextScript
		: currentScript;
});
console.log(array);
/* 
    * Composability
    - higher order functions start to shine when you need to componse operations
    todo: let's write code that finds the average year of origin for living and
    dead scripts in the data set.
*/
function average(array) {
	return array.reduce((a, b) => a + b) / array.length;
}
let avgOriginLiving = Math.round(average(SCRIPTS.filter((s) => s.living)));
console.log(avgOriginLiving);
let avgOriginDead = Math.round(average(SCRIPTS.filter((s) => !s.living)));
console.log(avgOriginDead);
// * Alternatively:
let total = 0,
	count = 0;
for (let script of SCRIPTS) {
	if (script.living) {
		total += script.year;
		count += 1;
	}
}
let avgOriginLiving = Math.round(total / count);
// ! second way is more optimal when data is large since
// ! higher order functions build new arrays and the second way does less work.

/* 
    * Strings & Character Codes
	- another use of the data set would be figuring out what script
	a piece of text is using.
*/
function characterScript(code) {
	for (let script of SCRIPTS) {
		if (
			script.ranges.some(([from, to]) => {
				return code >= from && code < to;
			})
		) {
			return script;
		}
	}
	return null;
}
/* 
    * Flattening
    Use the reduce method in combination with the concat method
    to "flatten" an array of arrays into a single array that has
    all the elements of the original arrays.
*/
let arr = [
	[1, 2, 3, 4],
	[5, 6, 7, 8],
	[9, 10, 11, 12],
];
let reduced = arr.reduce((currentArr, nextArr) => {
	currentArr = currentArr.concat(...nextArr);
	return currentArr;
});
console.log(reduced);

/* 
	* Your Own Loop
	todo: myLoop(value, test function, update function, body function)
*/
function myLoop(value, test, update, body) {
	if (!test(value)) return false;
	body(value);
	let updatedValue = update(value);
	myLoop(updatedValue, test, update, body);
}
myLoop(
	3,
	(n) => n > 0,
	(n) => n - 1,
	console.log
);
// alternatively, iterative version:
function myOtherLoop(start, test, update, body){
	for(let value = start; test(value); value = update(value)){
		body(value);
	}
}
myOtherLoop(
	3,
	(n) => n > 0,
	(n) => n - 1,
	console.log
);

/* 
	* Everything
	-- versions of array.every(array, predicate) 
	--- one using a loop
	--- other using the some method
*/
function every1(array = [], predicate){
	for(let item of array){
		if(!predicate(item)) return false;
	}
	return true;
}
console.log(every1([4,5,6,7], el => el < 0))
console.log(every1([4,5,6,7], el => el >= 4))
function every2(array = [], predicate){
	if(!array.some(predicate)) return false;
	return true;
}
console.log(every2([4,5,6,7], el => el < 0))
console.log(every2([4,5,6,7], el => el >= 4))

/*
	* Dominant Writing Direction
*/