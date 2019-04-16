function Graph() {
  this.nodes = [];
  this.graph = {};
  this.end = null;
  this.start = null;
}

Graph.prototype.addNode = function(n) {
  this.nodes.push(n);
  let title = n.value;
  this.graph[title] = n;
};

Graph.prototype.getNode = function(actor) {
  return this.graph[actor];
};

Graph.prototype.reset = function() {
  for (let i = 0; i < this.nodes.length; i++) {
    this.nodes[i].searched = false;
    this.nodes[i].parent = null;
  }
};

Graph.prototype.setStart = function(actor) {
  this.start = this.graph[actor];

  return this.start;
};

Graph.prototype.setEnd = function(actor) {
  this.end = this.graph[actor];

  return this.end;
};

