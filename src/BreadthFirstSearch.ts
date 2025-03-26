import { GraphNode } from "./GraphNode.ts";
import { GraphNodeStatus } from "./GraphNodeStatus.ts";

export class BreadthFirstSearch
{
    static breadthFirstSearch<T> (root: GraphNode<T>): void {
        let queue: GraphNode<T>[] = [];

        root.setStatus(GraphNodeStatus.visited);
        queue.push(root);

        while (queue.length > 0) {
            let current: GraphNode<T> = queue.shift()!;
            console.log(current.value);

            for (let [, value] of current.adjacent) {
                if (value.status === GraphNodeStatus.unvisited) {
                    value.setStatus(GraphNodeStatus.visited);
                    queue.push(value);
                }
            }
        }
    }
}