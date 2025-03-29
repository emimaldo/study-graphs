import { CloneGraph } from '../src/clone-graph/CloneGraph.ts';
import { Graph } from '../src/Graph.ts';

describe('CloneGraph', () => {
    let cloneGraph: CloneGraph;

    beforeEach(() => {
        cloneGraph = new CloneGraph();
    });

    it('should clone a graph', () => {
        const graph = new Graph<number>();
        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1, node2);
        graph.addEdge(node2, node3);
        graph.addEdge(node3, node4);
        graph.addEdge(node4, node5);

        const clonedGraph = cloneGraph.cloneGraph(node1);

        expect(clonedGraph).not.toBe(node1);
        expect(clonedGraph).not.toBe(node2);
        expect(clonedGraph).not.toBe(node3);
        expect(clonedGraph).not.toBe(node4);
        expect(clonedGraph).not.toBe(node5);

        expect(clonedGraph).not.toBeNull();
        expect(clonedGraph!.getValue()).toBe(1);
        if (clonedGraph) {
            expect(clonedGraph.getAdjacents().size).toBe(1);
        } else {
            fail('clonedGraph is null');
        }
        expect(clonedGraph.getAdjacents().get(2)!.getValue()).toBe(2);

        const clonedNode2 = clonedGraph.getAdjacents().get(2)!;
        expect(clonedNode2.getAdjacents().size).toBe(1);
        expect(clonedNode2.getAdjacents().get(3)!.getValue()).toBe(3);

        const clonedNode3 = clonedNode2.getAdjacents().get(3)!;
        expect(clonedNode3.getAdjacents().size).toBe(1);
        expect(clonedNode3.getAdjacents().get(4)!.getValue()).toBe(4);

        const clonedNode4 = clonedNode3.getAdjacents().get(4)!;
        expect(clonedNode4.getAdjacents().size).toBe(1);
        expect(clonedNode4.getAdjacents().get(5)!.getValue()).toBe(5);

        const clonedNode5 = clonedNode4.getAdjacents().get(5)!;
        expect(clonedNode5.getAdjacents().size).toBe(0);
    });
});
    