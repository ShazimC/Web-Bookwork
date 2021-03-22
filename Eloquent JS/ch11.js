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

requestType("connections", (nest, {name, neighbors}, source) => {
	let connections = nest.state.connections;
	if(JSON.stringify(connections.get(name)) === JSON.stringify(neighbors))
		return;
	connections.set(name, neighbors);
	broadcastConnections(nest, name, source);
})

function broadcastConnections(nest, name, exceptFor = null) {
	for(let neighbor of nest.neighbors) {
		if(neighbor === exceptFor) continue;
		request(nest, neighbor, "connections", {
			name,
			neighbors: nest.state.connections.get(name)
		});
	}
}

everywhere(nest => {
	nest.state.connections = new Map;
	nest.state.connections.set(nest.name, nest.neighbors);
	broadcastConnections(nest, nest.name);
})

