// * Bugs & Errors
function canYouSpotTheProblem() {
  "use strict";
  for (counter = 0; counter < 10; counter++) {
    console.log(counter);
  }
}
canYouSpotTheProblem();

/* 
  todo: exercises
*/

// * Retry
class MultiplicatorUnitFailure extends Error {}
function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) throw new MultiplicatorUnitFailure("Yikies");
  else return a * b;
}
function wrapper(a, b) {
  while (true) {
    try {
      let result = primitiveMultiply(a, b);
      return `result is: ${result}`;
    } catch (error) {
      if (error instanceof MultiplicatorUnitFailure) {
        console.log(error);
      }
    }
  }
}
console.log(wrapper(8, 8));

// * The Locked Box
const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error("Locked!");
    return this._content;
  },
};
function withBoxUnlocked(action) {
  let wasLocked = box.locked;
  if (box.locked) box.unlock();
  try {
    return action();
  } catch (e) {
    // do nothing with exception
  } finally {
    if (wasLocked) box.lock();
  }
}
