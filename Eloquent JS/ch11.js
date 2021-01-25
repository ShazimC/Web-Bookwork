// todo: Asynchronous Programming
/* 
    * The speed at which something like a loop executes depends on the
    * PROCESSOR.
*/

/* 
    * Asynchronity
    - In a synchronous programming model, things happen one at a time.
    - An asynchronous model allows multiple things to happen at the same time.
    - Makes expressing programs that do not fit in the straight-line model
        of control easier, but it can also make expressing programs that do
        more awkward.
*/

/* 
    * Crow Tech
    - bruh
*/

/* 
    * Callbacks
    - One approach to async programming is to make functions that take
    callback functions as an arg.
    - So the func does something, then performs the callback func.
*/

// an example of a function that takes callbacks is
setTimeout(() => {
    console.log('this is the callback function work')
}, 500);

/* 
    * Promises
*/