let data;
let graph;
let dropdown;

function preload() {
  data = loadJSON('bacon.json');
}

function setup() {
  graph = new Graph();
  noCanvas();
  dropdown = createSelect();
  dropdown.changed(breadthFirstSearch);
  let movies = data.movies;

  for (let i = 0; i < movies.length; i++) {
    let movie = movies[i].title;
    let cast = movies[i].cast;
    let movieNode = new Node(movie);
    graph.addNode(movieNode);

    for (let j = 0; j < cast.length; j++) {
      let actor = cast[j];
      let actorNode = graph.getNode(actor);
      if (typeof actorNode === 'undefined') {
        actorNode = new Node(actor);
        dropdown.option(actor);
      }
      graph.addNode(actorNode);
      movieNode.addEdge(actorNode);
    }
  }
}

function breadthFirstSearch() {
  graph.reset();
  let start = graph.setStart(dropdown.value());
  let end = graph.setEnd('Kevin Bacon');

  let queue = [];
  start.searched = true;
  queue.push(start);

  while (queue.length > 0) {
    let current = queue.shift();
    if (current === end) {
      console.log(`Found: ${current.value}`);
      break;
    }
    let edges = current.edges;
    for (let i = 0; i < edges.length; i++) {
      let neighbor = edges[i];
      if (!neighbor.searched) {
        neighbor.searched = true;
        neighbor.parent = current;
        queue.push(neighbor);
      }
    }
  }

  visualise();
}

function visualise() {
  let path = [];
  path.push(graph.end);
  let next = graph.end.parent;
  while (next !== null) {
    path.push(next);
    next = next.parent;
  }

  let txt = '';
  for (let i = path.length - 1; i >= 0; i--) {
    let n = path[i];
    txt += n.value;
    if (i !== 0) {
      txt += ' --> ';
    }
  }
  createP(txt);
}
