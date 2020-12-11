function range(start, end, step) {
	let diff = Math.abs(end - start);
	let output = [start];
	let s = step ? step : 1;
	for (let i = s; i <= diff; i += s) {
		output.push(start + i);
	}
	return output;
}
console.log(range(1, 10));
function sum(arr) {
	let out = 0;
	arr.forEach((num) => {
		out += num;
	});
	return out;
}
console.log(range(1, 10, 2));
function reverseArray(arr) {
	let out = [];
	for (let i = arr.length - 1; i >= 0; i--) {
		out.push(arr[i]);
	}
	return out;
}
console.log(reverseArray(range(1, 5)));
function reverseArrayInPlace(arr) {
	for (let i = 0; i < Math.floor(arr.length / 2); i++) {
		let temp = arr[i];
		arr[i] = arr[arr.length - 1 - i];
		arr[arr.length - 1 - i] = temp;
	}
	return arr;
}
console.log(reverseArrayInPlace(range(1, 5)));
function binarySearch(target, sortedArray) {
	if (sortedArray.length === 0) return "Empty array";
	if (sortedArray.length === 1) return target === sortedArray[0];
	let len = sortedArray.length;
	let mid = sortedArray[Math.floor(len / 2)];
	if (target === mid) return Math.floor(len / 2);
	if (target < mid) return binarySearch(target, sortedArray.slice(0, mid));
	else return binarySearch(target, sortedArray.slice(mid));
}
console.log(binarySearch(5, [0, 3, 5, 6, 9, 10]));

// List
function arrayToList(array = []) {
	let list = { value: null, rest: null };
	if (array.length === 0) return list;
	if (array.length === 1) {
		list.value = array[0];
		return list;
	}
	list.value = array[0];
	list.rest = arrayToList(array.slice(1));
	return list;
}
console.log(arrayToList([1, 2, 3]));

let myList = {
	value: 1,
	rest: {
		value: 2,
		rest: {
			value: 3,
			rest: null,
		},
	},
};
function listToArray(list = {}) {
	let output = [];
	if (Object.keys(list).length === 0) return output;
	let pointer = list;
	while (pointer !== null) {
		output.push(pointer.value);
		pointer = pointer.rest;
	}
	return output;
}
console.log(listToArray(myList));

function prepend(element, list) {
	let output = { value: element, rest: list };
	return output;
}
console.log(prepend(5, myList));

function nth(position, list) {
	if (position === 0) return list.value;
	if (list.rest === null) return undefined;
	return nth(position - 1, list.rest);
}
console.log(nth(1, myList));

// Deep Comparison
function deepEqual(a, b) {
	if (typeof a !== typeof b) return false;
	if (a === b) return true;
	const keysA = Object.keys(a), keysB = Object.keys(b);
	if (keysA.length !== keysB.length) return false;
	Object.keys(a).forEach((key) => {
		if (!keysB.includes(key)) return false;
		if (deepEqual(a[key], b[key]) === false) return false;
	});
	return true;
}
