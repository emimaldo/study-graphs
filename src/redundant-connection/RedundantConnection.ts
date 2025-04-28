export class RedundantConnection
{
    /**
     * Finds the redundant edge in an undirected graph.
     * 
     * This function uses the Union-Find algorithm to detect cycles.
     * When trying to add an edge between two nodes that are already
     * connected, that edge is redundant (forms a cycle).
     * 
     * @param edges - Array of edges where each edge is a pair [u, v]
     * @returns The redundant edge that forms a cycle, or null if none exists
     * 
     * @example
     * // Step-by-step example:
     * // Consider the graph with edges: [[1,2], [2,3], [3,4], [1,4], [4,5]]
     * // Where [1,4] is redundant (forms a cycle 1-2-3-4-1)
     * //
     * // Initially:
     * // parent = [0,1,2,3,4,5] (each node is its own parent)
     * // rank =   [0,0,0,0,0,0] (all trees have height 0)
     * //
     * // Processing edge [1,2]:
     * // find(1) = 1, find(2) = 2 (different sets)
     * // We join the sets: parent = [0,1,1,3,4,5], rank = [0,1,0,0,0,0]
     * //
     * // Processing edge [2,3]:
     * // find(2) = 1, find(3) = 3 (different sets)
     * // We join the sets: parent = [0,1,1,1,4,5], rank = [0,1,0,0,0,0]
     * //
     * // Processing edge [3,4]:
     * // find(3) = 1, find(4) = 4 (different sets)
     * // We join the sets: parent = [0,1,1,1,1,5], rank = [0,1,0,0,0,0]
     * //
     * // Processing edge [1,4]:
     * // find(1) = 1, find(4) = 1 (same set!)
     * // Cycle detected -> [1,4] is the redundant edge
     * //
     * // The function returns [1,4]
     */
    findRedundantConnection(edges: number[][]): number[] | null {
        const parent: number[] = Array(edges.length + 1).fill(0);
        const rank: number[] = Array(edges.length + 1).fill(0);

        const find = (x: number): number => {
            if (parent[x] !== x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        };

        const union = (x: number, y: number): boolean => {
            const rootX = find(x);
            const rootY = find(y);
            if (rootX === rootY) {
                return false;
            }
            if (rank[rootX] > rank[rootY]) {
                parent[rootY] = rootX;
            } else if (rank[rootX] < rank[rootY]) {
                parent[rootX] = rootY;
            } else {
                parent[rootY] = rootX;
                rank[rootX]++;
            }
            return true;
        };

        for (let i = 1; i <= edges.length; i++) {
            parent[i] = i;
        }

        for (const edge of edges) {
            const [u, v] = edge;
            if (!union(u, v)) {
                return edge;
            }
        }

        return null;
    }
}