// todo: Asynchronous Programming
/*
 * The speed at which something like a loop executes depends on the
 * PROCESSOR.
 */

/* 
    * Asynchronity
    - In a synchronous programming model, things happen one at a time.
        = Sequential
    - An asynchronous model allows multiple things to happen at the same time.
        = Parallel
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
}, 500)

/* 
    * Promises
    - The main advantage of these is
        - they simplify the use of async functions.
        - instead of having to pass around callbacks, promise-based functions
        look similar to regular ones: they take input as arguments and return
        their output. The only difference is that the output may not be
        available yet.
*/
let fifteen = Promise.resolve(15)
fifteen.then((value) => console.log(`Got ${value}`))
let sixteen = new Promise((resolve, reject) => {
  let num = 16
  if (num === 16) resolve(num)
  else reject(num)
})
sixteen.then(
  (val) => console.log(`It's ${val}`),
  (rej) => console.log(`Rejected ${rej}`),
)

/*
    * Failure
    - second callback to then method
    - catch method
    - return statement inside a then/catch acts as a resolve(value) and passes
    that value onto the next handler.
    - JS environments can detect when a promise rejection isn't handled and will
    report this as an error.
*/

/*
    * Networks are Hard
    - Promises can be resolved or rejected only once.
*/

class Timeout extends Error {}
function request(nest, target, type, content) {
  return new Promise((resolve, reject) => {
    let done = false
    function attempt(n) {
      nest.send(target, type, content, (failed, value) => {
        done = true
        if (failed) reject(failed)
        else resolve(value)
      })
      setTimeout(() => {
        if (done) return
        else if (n < 3) attempt(n + 1)
        else reject(new Timeout('Timed out'))
      }, 250)
    }
    attempt(1)
  })
}

function requestType(name, handler) {
  defineRequestType(name, (nest, content, source, callback) => {
    try {
      Promise.resolve(handler(nest, content, source)).then(
        (response) => callback(null, response),
        (failure) => callback(failure),
      )
    } catch (exception) {
      callback(exception)
    }
  })
}

/* 
    * Collections of Promises
    - Promise.all function can be useful
        - returns a promise that waits for all of the promises
        in the array to resolve and then resolves to an array of the
        values that these promises produced (in the same order as the 
        original array). If any in the array are rejected, Promise.all
        itself is rejected.
*/

function availableNeighbors(nest) {
  let requests = nest.neighbors.map((neighbor) => {
    return request(nest, neighbor, 'ping').then(
      () => true,
      () => false,
    )
  })
  return Promise.all(requests).then((result) => {
    return nest.neighbor.filter((_, i) => result[i])
  })
}

/* 
    * Network Flooding
    - For broadcasting information to the whole network, one
    solution is to set up a type of request that is automatically forwarded
    to neighbors. These neighbors then in turn forward it to their neighbors,
    until the whole network has received the message.
		- Flooding is when a piece of information is spread throughout a network
		until all nodes have it.
*/

import { everywhere } from './crow-tech'
everywhere((nest) => {
  nest.state.gossip = []
})
function sendGossip(nest, message, exceptFor = null) {
  nest.state.gossip.push(message)
  for (let neighbor of nest.neighbors) {
    if (neighbor === exceptFor) continue
    request(nest, neighbor, 'gossip', message)
  }
}
requestType('gossip', (nest, message, source) => {
  if (nest.state.gossip.includes(message)) return
  console.log(`${nest.name} received gossip '${message}' from ${source}`)
  sendGossip(nest, message, source)
})

/* 
	* Message Routing
	- Flooding is not an efficient approach for when a node wants to talk
	to another single node.
*/

requestType('connections', (nest, { name, neighbors }, source) => {
  let connections = nest.state.connections
  if (JSON.stringify(connections.get(name)) === JSON.stringify(neighbors))
    return
  connections.set(name, neighbors)
  broadcastConnections(nest, name, source)
})

function broadcastConnections(nest, name, exceptFor = null) {
  for (let neighbor of nest.neighbors) {
    if (neighbor === exceptFor) continue
    request(nest, neighbor, 'connections', {
      name,
      neighbors: nest.state.connections.get(name),
    })
  }
}

everywhere((nest) => {
  nest.state.connections = new Map()
  nest.state.connections.set(nest.name, nest.neighbors)
  broadcastConnections(nest, nest.name)
})

function findRoute(from, to, connections) {
  let work = [{ at: from, via: null }]
  for (let i = 0; i < work.length; i++) {
    let { at, via } = work[i]
    for (let next of connections.get(at) || []) {
      if (next === to) return via
      if (!work.some((w) => w.at === next)) {
        work.push({ at: next, via: via || next })
      }
    }
  }
  return null
}

function routeRequest(nest, target, type, content) {
  if (nest.neighbors.includes(target)) {
    return request(nest, target, type, content)
  } else {
    let via = findRoute(nest.name, target, nest.state.connections)
    if (!via) throw new Error(`No route to ${target}`)
    return request(nest, via, 'route', { target, type, content })
  }
}

requestType('route', (nest, { target, type, content }) => {
  return routeRequest(nest, target, type, content)
})

/* 
	* Async Functions
	- async function will always return a promise.
  - as soon as the body returns something, that promise is resolved
  - if it throws an exception, the promise is rejected.
  - 
*/

async function example(something) {
  if (something === 'correct') return true
  else throw new Error('Not correct')
}

async function useExample() {
  let resolved = await example('current')
  // if exception occurs, code stops right here and throws it.
  console.log(resolved) // will log true
}
useExample()
example(null).catch((err) => console.error(err)) // will log 'Not correct' error

/*
  * Generators
  - function* => generator
  - returns an iterator
*/

function* powers(n) {
  for (let current = n; ; current *= n) {
    yield current
  }
}
let generator = powers(5)
console.log(generator.next())
console.log(generator.next())
console.log(generator.next())
/* 
  - generators automatically save their local state every time they yield.
  at the point that they yield the value.
  - you can only yield inside the generator scope
  e.g gen(){ fun(){ yield ..; }} will not work.
*/
for (let power of powers(3)) {
  // for-of loops over iterables
  if (power > 50) break
  console.log(power)
}
const obj = { name: 'shazim', age: 23 }
for (let prop in obj) {
  // for-in is used for objects.
  console.log(prop + ':', obj[prop])
}
// -> 3
// -> 9
// -> 27

/* 
  * The Event Loop
  - No matter how closely together events -- such as timeouts or
  incoming requests -- happen, a JavaScript environment will run
  only one program at a time.
  * --> You can think of this as it running a big loop around your
  * program, called the event loop.
  - when there's nothing to be done, that loop is stopped. But as
  events come in, they are added to a queue, and their code is
  executed one after the other. Because no two things run at
  the same time, slow-running code might delay the handling of other
  events.
*/

try {
  setTimeout(() => {
    throw new Error('Woosh')
  }, 20)
} catch (_) {
  // This will not run
  console.log('Caught!')
}

/* 
  - async behavior happens on its own empty function call stack
  - this is one of the reasons that, without promises, managing 
  exceptions across async code is hard.
    - This is because each callback starts with a mostly empty
    stack, your catch handlers won't be on the stack when they throw
    an exception.
*/

// this example sets a timeout but then waits until the timeout's
// intended point of time, causing the timeout be late.
let start = Date.now()
setTimeout(() => {
  console.log('Timeout ran at', Date.now() - start)
}, 20)
while (Date.now() < start + 50) {
  //nothing
}
console.log('Wasted time until', Date.now() - start)
// --> Wasted time until 50
// --> Timeout ran at 55

// * Promises always resolve or reject as a new event.
Promise.resolve('DONE').then(console.log)
// --> Me first!
// --> DONE
/* 
  Even if a promise is already resolved, waiting for it
  will cause your callback to run after the current script finishes
  rather than right away 
*/

/*
 * Asynchronous Bugs
 */

// synch code doesn't have gaps where async code CAN, e.g:
function storage(nest, name) {
  return new Promise((resolve) => {
    nest.readStorage(name, (result) => resolve(result))
  })
}

function anyStorage(nest, source, name) {
  if (source === nest.name) return storage(nest, name)
  else return routeRequest(nest, source, 'storage', name)
}

async function chicks(nest, year) {
  let list = ''
  await Promise.all(
    network(nest).map(async (name) => {
      list += `${name}: ${await anyStorage(nest, name, `chicks in ${year}`)}\n`
    }),
  )
  return list
}
/* 
  each of the map iteration starts with the list = ''
  which means that when the await statements finish they're all going to
  add onto list equaling empty '', resulting in one giant line.
*/

async function chicks2(nest, year) {
  let lines = network(nest).map(async (name) => {
    return name + ': ' + (await anyStorage(nest, name, `chicks in ${year}`))
  }) // is now an array
  return (await Promise.all(lines)).join('\n')
  // and can be returned as string list by calling join('\n') on the array.
}

/* 
  we solve that issue by turning the lines variable into an array
  instead of a string and then using join to make the array into
  a line by line string.
*/

/* 
  * Summary
  Asynchronous programming helps optimize code workflow when the code doesn't
  have to wait for a task to finish or a response to come through before moving
  onto the next line of code.

  However, async programming needs to be done in a way such that proceeding
  past the async task does not break the program. E.g if response of request is
  necessary for code to run correctly in the next line.

  Main way to program asynchronously in JS is by using Promises, callbacks, and
  async/await.
*/

// * Exercises

/* 
  ? Tracking the Scalpel
*/
async function locateScalpel(nest) {}

/* 
  ? Building Promise.all
  - Given an array of promises, Promise.all returns a promise that
  waits for all of the promises in the array to finish.
  - If all of the promises succeed, it yields an array of the result values,
  if any single promise fails, Promise.all returns a failed promise with
  the failure reason from the first failing promise?
*/

async function fakeRequest(failReason, waitFor) {
  let timeMessage = `, took ${waitFor} secs`
  let output = ''
  if (!failReason) output = 'Success!' + timeMessage
  else output = 'Promise failed, reason: ' + failReason + timeMessage
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (failReason) reject(output)
      else resolve(output)
    }, waitFor)
  })
}

let requests = []
for (let i = 0; i < 10; i++) {
  let randomSeconds = Math.ceil(Math.random() * 10)
  let reason = randomSeconds % 2 === 0 ? 'hehexd' : null
  requests.push(fakeRequest(reason, randomSeconds))
}
Promise.all(
  requests.map((req) =>
    req.catch((err) => {
      return err
    }),
  ),
).then(console.log)

function Promise_all(promises) {
  return new Promise((resolve, reject) => {
    let successes = [], successCount = 0;
    if(promises.length === 0) resolve(successes);
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(val => {
        successes[i] = val;
        successCount++;
        if(successCount === promises.length) 
          resolve(successes);
      }).catch(reject);
    }
  })
}
Promise_all(requests).then(console.log).catch(console.error)
