import { GraphNode } from "./GraphNode.ts";

export class Graph<T> 
{
    public nodes: Map<T, GraphNode<T>>;

    constructor () {
        this.nodes = new Map<T, GraphNode<T>>();
    }

    getNode(value: T): GraphNode<T> | undefined {
        return this.nodes.get(value);
    }

    addNode(value: T): GraphNode<T> {
        if (this.nodes.has(value)) {
            // If the node already exists, return it
            return this.nodes.get(value)!;
        }
        const newNode = new GraphNode(value);
        this.nodes.set(value, newNode);
        return newNode;
    }

    addEdge(start: GraphNode<T>, end: GraphNode<T>) {
        this.addNode(start.getValue());
        this.addNode(end.getValue());

        start.getAdjacents().set(end.getValue(), end);
    }

    getAllNodes(): GraphNode<T>[] {
        return Array.from(this.nodes.values());
    }

    get size(): number {
        return this.nodes.size;
    }
}