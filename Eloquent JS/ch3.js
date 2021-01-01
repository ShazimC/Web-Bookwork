// Minimum
function min(a, b) {
	return a <= b ? a : b;
}
// Recursion
function isEven(a) {
	if (Math.abs(a) === 0) return true;
	if (Math.abs(a) === 1) return false;
	return isEven(Math.abs(a) - 2);
}

console.log(min(42, 39));
console.log(isEven(-1));

function countBs(str) {
	return countChar(str, "B");
}
console.log(countBs("haBBy Birthday B!"));

function countChar(str, char) {
	let count = 0;
	for (let i = 0; i < str.length; i++) {
		if (str[i] === char) count++;
	}
	return count;
}
console.log(countChar("happy birthday", "b"));