import { GraphNode } from "./GraphNode.ts";
import { GraphNodeStatus } from "./GraphNodeStatus.ts";

export class DepthFirstSearch
{
    static depthFirstSearch<T>(root: GraphNode<T>): void {
        if (!root) {
            return;
        }

        console.log(root.value);
        root.setStatus(GraphNodeStatus.visited);

        for (let [key, value] of root.adjacent) {
            if (value.status === GraphNodeStatus.unvisited) {
                DepthFirstSearch.depthFirstSearch(value);
            }
        }
    }
}