import { Graph } from '../Graph.ts';

export class BuildOrder {
    public findBuildOrder(dependencies: string[][]): string[] | null {
        const graph = this.buildGraph(dependencies);
        return this.topologicalSort(graph);
    }

    private buildGraph(dependencies: string[][]): Graph<string> {
        const graph = new Graph<string>();

        for (const [a, b] of dependencies) {
            const nodeA = graph.addNode(a); // Add or retrieve node A
            const nodeB = graph.addNode(b); // Add or retrieve node B
            nodeA.addAdjacent(nodeB); // Connect A -> B
        }

        return graph;
    }

    private topologicalSort(graph: Graph<string>): string[] | null {
        const inDegree = new Map<string, number>();
        const queue: string[] = [];
        const result: string[] = [];

        // Initialize in-degree
        for (const node of graph.getAllNodes()) {
            inDegree.set(node.getValue(), 0);
        }

        // Calculate in-degree
        for (const node of graph.getAllNodes()) {
            for (const neighbor of node.getAdjacents().values()) {
                inDegree.set(neighbor.getValue(), (inDegree.get(neighbor.getValue()) || 0) + 1);
            }
        }

        // Add nodes with in-degree 0 to the queue
        for (const [node, degree] of inDegree.entries()) {
            if (degree === 0) queue.push(node);
        }

        // Process the queue
        while (queue.length > 0) {
            const current = queue.shift()!;
            result.push(current);

            for (const neighbor of graph.getNode(current)!.getAdjacents().values()) {
                inDegree.set(neighbor.getValue(), inDegree.get(neighbor.getValue())! - 1);
                if (inDegree.get(neighbor.getValue()) === 0) queue.push(neighbor.getValue());
            }
        }

        // Verify if the order is valid
        return result.length === graph.getAllNodes().length ? result : null;
    }
}