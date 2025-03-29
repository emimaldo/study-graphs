import { GraphNode } from "../GraphNode.ts";

export class CloneGraph
{
    public cloneGraph(node: GraphNode<number>): GraphNode<number> | null {
        if (!node) return null;
        const visited = new Map<number, GraphNode<number>>();
        return this.clone(node, visited);
    }

    private clone(node: GraphNode<number>, visited: Map<number, GraphNode<number>>): GraphNode<number> {
        if (visited.has(node.getValue())) return visited.get(node.getValue())!;

        const newNode = new GraphNode(node.getValue());
        visited.set(node.getValue(), newNode);

        for (const neighbor of node.getAdjacents().values()) {
            newNode.getAdjacents().set(neighbor.getValue(), this.clone(neighbor, visited));
        }

        return newNode;
    }
}