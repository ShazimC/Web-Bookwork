//todo: Chapter 15 Handling Events
/* 
  * Event Handlers
  - 
*/

/* 
  * Events and DOM Nodes
  - Each event handler is registered TO something.
  - We can register event handlers to DOM nodes.
  - Event listeners are called only when the event
  happens in the context of the object they are registered on.
*/

/*
  * Focus Events do not propagate
  - a handler on a parent element is not notified when a child element
  gains or loses focus.
*/

/* 
  * Load Events
  - the 'load' event fires on the window and DOM body objects when
  the page finishes loading.
  - the 'beforeunload' event fires when a page is closed or navigated
  away from.
  - Preventing the page from unloading is done by returning a non-null
  value from the handler. At which point the user will be prompted with
  "Are you sure you want to leave this page?"
*/

let squareWorker = new Worker("./squareWorker.js");
squareWorker.addEventListener("message", event => {
  console.log("The worker responded: ", event.data)
});
squareWorker.postMessage(10);
squareWorker.postMessage(24);
// gotta be run inside browser

let ticks = 1;
let clock = setInterval(() => {
  console.log('tick', ticks++);
  if(ticks === 10){
    clearInterval(clock);
    console.log('stop');
  }
})