// * Ex: A Vector Type
class Vec {
	constructor(x, y) {
		this.x = x;
		this.y = y;
	}
	plus(vec) {
		let newX = this.x + vec.x;
		let newY = this.y + vec.y;
		return new Vec(newX, newY);
	}
	minus(vec) {
		let newX = this.x - vec.x;
		let newY = this.y - vec.y;
		return new Vec(newX, newY);
	}
	get length() {
		let x = this.x;
		let y = this.y;
		return Math.sqrt(x * x + y * y);
	}
}

// * Ex: Groups
// * Ex: Iterable Groups
class Group {
	constructor() {
		this.values = [];
	}
	add(value) {
		if (!this.has(value)) this.values.push(value);
	}
	delete(value) {
		let index = this.values.indexOf(value);
		if (index > -1) this.values.splice(index, 1);
	}
	has(value) {
		return this.values.includes(value);
	}
	static from(iterable) {
		let group = new Group();
		for (const iterator of iterable) {
			group.add(iterator);
		}
		return group;
    }
    [Symbol.iterator](){
        return new GroupIterator(this);
    }
}

class GroupIterator {
	constructor(group) {
		this.group = group;
		this.current = 0;
	}
	next() {
		if (this.current >= this.values.length) return { done: true };
		let val = {
			index: this.current,
			value: this.group.values[this.current],
			done: false,
		};
		this.current++;
		return value;
	}
}

// * Borrowing a Method
let obj = {name: true, hasOwnProperty: true}
console.log(Object.prototype.hasOwnProperty.call(obj, "name"));