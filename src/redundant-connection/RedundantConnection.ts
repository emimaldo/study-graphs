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
        // This line creates an array for the Union-Find algorithm that
        // will store the "parent" relationships between the graph nodes
        const parent: number[] = Array(edges.length + 1).fill(0);
        // rank[i] helps keep the trees shallow when joining sets
        const rank: number[] = Array(edges.length + 1).fill(0);

        // Function to find the root of the set to which x belongs
        // Applies path compression to optimize future searches
        const find = (x: number): number => {
            if (parent[x] !== x) {
                parent[x] = find(parent[x]);
            }
            return parent[x];
        };

        /**
         * // The find function:
         * // -----------------
         * // 1. Purpose: Find the representative (the root) of the set to which a node belongs
         * // 2. In graph terms: Determines which connected component a node belongs to
         * //
         * // Path Compression:
         * // ----------------
         * // - An optimization that "flattens" the hierarchical structure of the tree
         * // - When searching for the root of a node, we update all nodes along the path
         * //   to point directly to the root
         * // - Without this optimization, trees could become very deep,
         * //   making find() O(n) in the worst case
         * // - With path compression, the amortized time of find() is practically O(1)
         * //
         * // Path compression example:
         * // Suppose parent = [0,1,1,2,3,4] (node 4 has parent 3, which has parent 2, which has parent 1)
         * // When calling find(4):
         * //   1. parent[4] = 3, not equal to 4, so call find(3)
         * //   2. parent[3] = 2, not equal to 3, so call find(2)
         * //   3. parent[2] = 1, not equal to 2, so call find(1)
         * //   4. parent[1] = 1, equal to 1, so 1 is the root
         * //   5. On returning from recursion, update:
         * //      - parent[2] = 1
         * //      - parent[3] = 1
         * //      - parent[4] = 1
         * // The final result is parent = [0,1,1,1,1,4], where all nodes point directly to root 1
         * //
         * // Initialization: parent = [0,1,2,3,4,5]
         * // --------------------------------------
         * // 1. Create the array: const parent: number[] = Array(edges.length + 1).fill(0);
         * // 2. Then, make each node its own parent:
         * //    for (let i = 1; i <= edges.length; i++) {
         * //        parent[i] = i;
         * //    }
         * // This means that initially each node is in its own separate set.
         */

        /**
         * // The union function:
         * // ------------------
         * // 1. Purpose: Join two disjoint sets into one
         * // 2. In graph terms: Connect two previously separated components
         * //
         * // How it works:
         * // ------------
         * // 1. Find the roots (representatives) of both sets using the find function
         * // 2. If the roots are equal, the elements are already in the same set
         * //    - This indicates there is a cycle in the graph
         * //    - Returns false to indicate the union was not performed
         * // 3. If the roots are different, join the sets by making one
         * //    point to the other and return true
         * //
         * // Union by Rank:
         * // -------------
         * // - An optimization to keep the search trees balanced
         * // - The "rank" approximates the height of the tree (depth)
         * // - When joining two trees, we want to minimize the resulting height:
         * //   * If one tree is "taller" than the other, make the root of the
         * //     shorter tree point to the root of the taller tree
         * //   * If both trees have the same height, arbitrarily choose one root
         * //     as parent and increment its rank
         * //
         * // Benefits:
         * // --------
         * // - Prevents trees from becoming very deep and degenerate
         * // - Combined with path compression, ensures that find() and union()
         * //   operations have amortized complexity close to O(1)
         * //
         * // Union by rank example:
         * // Suppose two trees: 
         * // Tree 1: root=1, nodes=[1,2,4], rank=1
         * // Tree 2: root=3, nodes=[3,5,6,7], rank=2
         * //
         * // When joining these trees with union(2,5):
         * // 1. find(2) = 1, find(5) = 3
         * // 2. Since rank[3]=2 > rank[1]=1, set parent[1] = 3
         * // 3. The result is a tree with root=3 and nodes=[1,2,3,4,5,6,7]
         * //    where rank[3] remains 2
         */

        /**
         * // Improved explanation of the union by rank example:
         * // -------------------------------------------------
         * // We have two separate trees:
         * // 
         * // Tree 1 (rank=1):        Tree 2 (rank=2):
         * //       1                        3
         * //      / \                     / | \
         * //     2   4                   5  6  7
         * //
         * // These trees are represented in our arrays as:
         * // parent = [0, 1, 1, 3, 1, 3, 3, 3]
         * //           ^ ^ ^ ^ ^ ^ ^ ^
         * //           | | | | | | | |
         * // index:    0 1 2 3 4 5 6 7
         * // 
         * // rank =   [0, 1, 0, 2, 0, 0, 0, 0]
         * //
         * // When we execute union(2,5):
         * // 
         * // 1. First call find(2) which returns 1 (the root of the tree containing 2)
         * // 2. Then call find(5) which returns 3 (the root of the tree containing 5)
         * // 3. Since rootX=1 and rootY=3 are different, we need to join these trees
         * // 4. Compare rank[1]=1 and rank[3]=2
         * // 5. Since rank[3] > rank[1], make the root of the smaller tree
         * //    point to the root of the larger tree: parent[1] = 3
         * //
         * // The result is a single tree:
         * //           3
         * //        /  |  \
         * //       1   6   7
         * //      / \
         * //     2   4
         * //
         * // The arrays are now:
         * // parent = [0, 3, 1, 3, 1, 3, 3, 3]  <- parent[1] changed from 1 to 3
         * // rank =   [0, 1, 0, 2, 0, 0, 0, 0]  <- ranks unchanged
         * //
         * // Note: The rank did not increase because we only increment the rank when
         * // joining two trees of the same rank. In this case, since rank[3] > rank[1],
         * // we do not need to increment rank[3].
         */

        /**
         * // Explanation of how we arrived at rank [0, 1, 0, 2, 0, 0, 0, 0]:
         * // --------------------------------------------------------------
         * // 
         * // 1. Initially, all nodes have rank 0:
         * //    rank = [0, 0, 0, 0, 0, 0, 0, 0]
         * //
         * // 2. To build Tree 1 (with root 1 and nodes 1, 2, 4):
         * //    Suppose we did these operations:
         * //    
         * //    - union(1, 2): Both nodes with rank 0, choose 1 as root
         * //      → parent[2] = 1, and since they have equal rank, increment rank[1] to 1
         * //      → rank = [0, 1, 0, 0, 0, 0, 0, 0]
         * //
         * //    - union(1, 4): rank[1]=1 > rank[4]=0, so 4 points to 1
         * //      → parent[4] = 1, ranks unchanged
         * //      → rank = [0, 1, 0, 0, 0, 0, 0, 0]
         * //
         * // 3. To build Tree 2 (with root 3 and nodes 3, 5, 6, 7):
         * //    Suppose these operations:
         * //
         * //    - union(3, 5): Both rank 0, choose 3 as root
         * //      → parent[5] = 3, increment rank[3] to 1
         * //      → rank = [0, 1, 0, 1, 0, 0, 0, 0]
         * //
         * //    - union(3, 6): same as before
         * //      → parent[6] = 3, ranks unchanged (because rank[3] > rank[6])
         * //      → rank = [0, 1, 0, 1, 0, 0, 0, 0]
         * //
         * //    - union(3, 7): same as before
         * //      → parent[7] = 3, ranks unchanged
         * //      → rank = [0, 1, 0, 1, 0, 0, 0, 0]
         * //
         * // 4. Finally, suppose we join another tree with root X where rank[X]=1:
         * //    - union(X, 3): since rank[X]=rank[3]=1, choose 3 as root
         * //      and increment rank[3] to 2
         * //      → rank = [0, 1, 0, 2, 0, 0, 0, 0]
         * //
         * // This is how we arrive at the state described in the example.
         */

        const union = (x: number, y: number): boolean => {
            const rootX = find(x);
            const rootY = find(y);
            if (rootX === rootY) {
                // If they already have the same root, adding this edge would form a cycle
                return false;
            }
            // Union by rank: the shorter tree joins the taller tree
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

        // Initialize each node as its own parent
        for (let i = 1; i <= edges.length; i++) {
            parent[i] = i;
        }

        // Iterate over each edge in the graph
        for (const edge of edges) {
            const [u, v] = edge;
            // Try to join the nodes of the edge
            if (!union(u, v)) {
                // If they cannot be joined, this edge is redundant (forms a cycle)
                return edge;
            }
        }

        // If no redundant edge is found, return null
        // (This should not occur according to the problem statement)
        return null;
    }
}