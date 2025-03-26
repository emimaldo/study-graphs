import { Graph } from "./Graph.ts";
import { GraphNodeStatus } from "./GraphNodeStatus.ts";

export class GraphNode<T> 
{
    public value: T;
    public status: GraphNodeStatus;
    public adjacent: Map<T, GraphNode<T>>;
    public graph?: Graph<T>;

    constructor (value: T) {
        this.value = value;
        this.status = GraphNodeStatus.unvisited;
        this.adjacent = new Map<T, GraphNode<T>>();
    }

    getStatus (): GraphNodeStatus {
        return this.status;
    }

    setStatus (status: GraphNodeStatus) {
        this.status = status;
    }

    addAdjacent (node: GraphNode<T>) {
        if (this.adjacent.get(node.value)) {
            this.adjacent.set(node.value, node);
        }
    }

    
}