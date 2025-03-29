import { Graph } from "./Graph.ts";
import { GraphNodeStatus } from "./GraphNodeStatus.ts";

export class GraphNode<T> 
{
    private value: T;
    private status: GraphNodeStatus;
    private adjacents: Map<T, GraphNode<T>>;
    private graph?: Graph<T>;

    constructor (value: T) {
        this.value = value;
        this.status = GraphNodeStatus.unvisited;
        this.adjacents = new Map<T, GraphNode<T>>();
    }

    getValue (): T {
        return this.value;
    }

    getGraph (): Graph<T> | undefined {
        return this.graph;
    }

    setGraph (graph: Graph<T>) {
        this.graph = graph;
    }

    getStatus (): GraphNodeStatus {
        return this.status;
    }

    setStatus (status: GraphNodeStatus) {
        this.status = status;
    }

    getAdjacents (): Map<T, GraphNode<T>> {
        return this.adjacents;
    }

    addAdjacent (node: GraphNode<T>) {
        if (this.adjacents.get(node.value)) {
            this.adjacents.set(node.value, node);
        }
    }

    
}