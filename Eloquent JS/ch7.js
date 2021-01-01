// todo: A Robot
const roads = [
  "Alice's House-Bob's House",
  "Alice's House-Cabin",
  "Alice's House-Post Office",
  "Bob's House-Town Hall",
  "Daria's House-Ernie's House",
  "Daria's House-Town Hall",
  "Ernie's House-Grete's House",
  "Grete's House-Farm",
  "Grete's House-Shop",
  "Marketplace-Farm",
  "Marketplace-Post Office",
  "Marketplace-Shop",
  "Marketplace-Town Hall",
  "Shop-Town Hall",
];
function buildGraphs(edges) {
  let graph = Object.create(null);
  function addEdge(from, to) {
    if (graph[from] == null) {
      graph[from] = [to];
    } else {
      graph[from].push(to);
    }
  }
  for (let [from, to] of edges.map((r) => r.split("-"))) {
    // console.log("from: ", from);
    // console.log("to: ", to);
    addEdge(from, to);
    addEdge(to, from);
  }
  // console.log(graph);
  return graph;
}
const roadGraph = buildGraphs(roads);

// todo: The Task
class VillageState {
  constructor(currentPlace, parcels) {
    this.currentPlace = currentPlace;
    this.parcels = parcels;
  }
  move(destination) {
    if (!roadGraph[this.currentPlace].includes(destination)) {
      return this;
    } else {
      let parcels = this.parcels
        .map((parcel) => {
          if (parcel.place !== this.currentPlace) return parcel;
          return {
            place: destination,
            address: parcel.address,
          };
        })
        .filter((parcel) => parcel.place !== parcel.address);
      return new VillageState(destination, parcels);
    }
  }
}
let first = new VillageState("Post Office", [
  { place: "Post Office", address: "Alice's House" },
]);
let next = first.move("Alice's House");
console.log(next.currentPlace);
// -> Alice's House
console.log(next.parcels);
// -> []
console.log(first.currentPlace);
// -> Post Office
function runRobot(state, robot, memory) {
  for (let turn = 0; ; turn++) {
    if (state.parcels.length === 0) {
      console.log(`Done in ${turn} turns`);
      break;
    }
    let action = robot(state, memory);
    state = state.move(action.direction);
    memory = action.memory;
    console.log(`Moved to ${action.direction}`);
  }
}
const mailRoute = [
  "Alice's House",
  "Cabin",
  "Alice's House",
  "Bob's House",
  "Town Hall",
  "Daria's House",
  "Ernie's House",
  "Grete's House",
  "Shop",
  "Grete's House",
  "Farm",
  "Marketplace",
  "Post Office",
];
function routeRobot(state, memory) {
  if (memory.length === 0) {
    memory = mailRoute;
  }
  return { direction: memory[0], memory: memory.slice(1) };
}
function findRoute(graph, from, to) {
  let work = [{ at: from, route: [] }];
  for (let i = 0; i < work.length; i++) {
    let { at, route } = work[i];
    for (let place of graph[at]) {
      if (place === to) return route.concat(place);
      if (!work.some((w) => w.at === place)) {
        work.push({ at: place, route: route.concat(place) });
      }
    }
  }
}
function goalOrientedRobot({ place, parcels }, route) {
  if (route.length === 0) {
    let parcel = parcels[0];
    if (parcel.place !== place) {
      route = findRoute(roadGraph, place, parcel.place);
    } else {
      route = findRoute(roadGraph, place, parcel.address);
    }
  }
  return {
    direction: route[0],
    memory: route.slice(1),
  };
}
console.log(
  goalOrientedRobot(
    {
      place: "Alice's House",
      parcels: [
        {
          place: "Alice's House",
          address: "Bob's House",
        },
        {
          place: "Alice's House",
          address: "Town Hall",
        },
      ],
    },
    ["Alice's House", "Bob's House", "Town Hall"]
  )
);
