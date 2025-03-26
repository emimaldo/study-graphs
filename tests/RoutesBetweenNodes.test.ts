import { Graph } from '../src/Graph.ts';
import { GraphNode } from '../src/GraphNode.ts';
import { RoutesBetweenNodes } from '../src/routes-between-nodes/RoutesBetweenNodes.ts';

describe ('RoutesBetweenNodes', () => {
    let routesBetweenNodes: RoutesBetweenNodes;

    beforeEach(() => {
        routesBetweenNodes = new RoutesBetweenNodes();
    });

    it('should return true if there is a route between two nodes', () => {
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

        expect(routesBetweenNodes.isRouteBetweenNodes(node1, node5)).toBe(true);
    });
    it('should return false if there is no route between two nodes', () => {
        const graph = new Graph<number>();
        const node1 = graph.addNode(1);
        const node2 = graph.addNode(2);
        const node3 = graph.addNode(3);
        const node4 = graph.addNode(4);
        const node5 = graph.addNode(5);

        graph.addEdge(node1, node2);
        graph.addEdge(node2, node3);
        graph.addEdge(node3, node4);

        expect(routesBetweenNodes.isRouteBetweenNodes(node1, node5)).toBe(false);
    });
});