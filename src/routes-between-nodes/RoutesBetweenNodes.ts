import { GraphNode } from '../GraphNode.ts';

export class RoutesBetweenNodes {
    
    isRouteBetweenNodes<T>(start: GraphNode<T>, end: GraphNode<T>): boolean {
        if (start === end) return true;

        const visited = new Set<GraphNode<T>>();
        const queue: GraphNode<T>[] = [start];

        while (queue.length > 0) {
            const current = queue.shift()!;
            if (current === end) return true;

            visited.add(current);

            for (const neighbor of current.getAdjacents().values()) {
                if (!visited.has(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }

        return false;
    }
}