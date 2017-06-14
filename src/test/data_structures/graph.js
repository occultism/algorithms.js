const Graph = require('../..').DataStructures.Graph;
const assert = require('assert');

describe('Graph - Adjacency list', () => {
  it('should be directed by default', () => {
    let g = new Graph();
    assert(g.directed);

    g = new Graph(false);
    assert(!g.directed);

    g = new Graph(true);
    assert(g.directed);
  });

  it('should default weight 1 for edges', () => {
    const g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addEdge('a', 'b');
    assert.strictEqual(g.edge('a', 'b'), 1);
  });

  it('should create the vertex if an edge is inserted and vertex doesnt exist',
    () => {
      const g = new Graph();
      g.addEdge('a', 'b');
      assert.equal(g.vertices.size, 2);
      assert(g.vertices.contains('a'));
      assert(g.vertices.contains('b'));
    });

  it('should sum multiple edges between the same vertices', () => {
    const g = new Graph();
    g.addEdge('a', 'b', 10);
    assert.equal(g.edge('a', 'b'), 10);
    g.addEdge('a', 'b', 4);
    assert.equal(g.edge('a', 'b'), 14);
  });

  it('should have edges in both directions if undirected', () => {
    const g = new Graph(false);
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    g.addVertex('d');
    g.addEdge('a', 'b', 10);
    g.addEdge('a', 'c', 5);
    g.addEdge('c', 'd', 2);

    assert.equal(g.edge('a', 'b'), 10);
    assert.equal(g.edge('b', 'a'), 10);
    assert.equal(g.edge('a', 'c'), 5);
    assert.equal(g.edge('c', 'a'), 5);
    assert.equal(g.edge('c', 'd'), 2);
    assert.equal(g.edge('d', 'c'), 2);

    assert.equal(g.edge('a', 'd'), undefined);
    g.addEdge('b', 'a', 2);
    assert.equal(g.edge('a', 'b'), 12);
    assert.equal(g.edge('b', 'a'), 12);
  });

  it('should respect direction of the edges in directed graphs', () => {
    const g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    g.addVertex('d');
    g.addEdge('a', 'b', 10);
    g.addEdge('a', 'c', 5);
    g.addEdge('c', 'd', 2);

    assert.equal(g.edge('a', 'b'), 10);
    assert.equal(g.edge('b', 'a'), undefined);
    assert.equal(g.edge('a', 'c'), 5);
    assert.equal(g.edge('c', 'a'), undefined);
    assert.equal(g.edge('c', 'd'), 2);
    assert.equal(g.edge('d', 'c'), undefined);

    assert.equal(g.edge('a', 'd'), undefined);
    g.addEdge('b', 'a', 2);
    assert.equal(g.edge('a', 'b'), 10);
    assert.equal(g.edge('b', 'a'), 2);
  });

  it('should have reversed edges with same weight for a reverse directed graph',
    () => {
      const g = new Graph();
      g.addVertex('a');
      g.addVertex('b');
      g.addVertex('c');
      g.addVertex('d');
      g.addEdge('a', 'b', 10);
      g.addEdge('a', 'c', 5);
      g.addEdge('c', 'd', 2);

      const r = g.reverse();
      assert(r.directed);
      assert.equal(r.edge('a', 'b'), undefined);
      assert.equal(r.edge('b', 'a'), 10);
      assert.equal(r.edge('a', 'c'), undefined);
      assert.equal(r.edge('c', 'a'), 5);
      assert.equal(r.edge('c', 'd'), undefined);
      assert.equal(r.edge('d', 'c'), 2);

      assert.equal(r.edge('a', 'd'), undefined);
      r.addEdge('a', 'b', 2);
      assert.equal(r.edge('a', 'b'), 2);
      assert.equal(r.edge('b', 'a'), 10);
    });

  it('should have a list of vertices', () => {
    const g = new Graph();
    assert.equal(g.vertices.size, 0);
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    assert.equal(g.vertices.size, 3);
    assert(g.vertices.contains('a'));
    assert(g.vertices.contains('b'));
    assert(g.vertices.contains('c'));
  });

  it('should not allow repeated vertices', () => {
    const g = new Graph();
    g.addVertex('a');
    assert.throws(() => {
      g.addVertex('a');
    });
  });

  it('should return a list of neighbors of a vertex', () => {
    const g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    g.addVertex('d');
    g.addEdge('a', 'b', 10);
    g.addEdge('a', 'c', 5);
    g.addEdge('c', 'd', 2);

    assert.deepEqual(g.neighbors('a'), ['b', 'c']);
    assert.deepEqual(g.neighbors('b'), []);
    assert.deepEqual(g.neighbors('c'), ['d']);
  });

  it('should return the weight of the edge', () => {
    const g = new Graph();
    g.addVertex('a');
    g.addVertex('b');
    g.addVertex('c');
    g.addVertex('d');
    g.addEdge('a', 'b', 10);
    g.addEdge('a', 'c', 5);
    g.addEdge('c', 'd', 2);

    assert.equal(g.edge('a', 'b'), 10);
    assert.equal(g.edge('a', 'c'), 5);
    assert.equal(g.edge('c', 'd'), 2);
  });

  it('should not "inherit" edges from Object.prototype', () => {
    const g = new Graph();
    g.addEdge('a', 'b');

    assert.ifError(g.edge('a', 'constructor'));
    assert.throws(g.edge.bind(g, 'valueOf', 'call'));
  });
});
