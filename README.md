# Graphs

## Definition
A graph is a data structure composed of a set of nodes, called vertices, and a set of connections between them, called edges. Unlike trees, a graph does not necessarily have a root node or a hierarchical structure.

**Graph Characteristics:**
- **Vertices (or Nodes):** Points or entities in the graph.  
- **Edges:** Connections between vertices, which can be directed or undirected.  
- **Edge Weight:** Optional value indicating cost or distance.  
- **Vertex Degree:** Number of edges connected to a node.  

**Types of Graphs:**
- **Directed Graph:** Edges have a direction.  
- **Undirected Graph:** Edges are bidirectional.  
- **Weighted Graph:** Edges carry numerical weights.  
- **Unweighted Graph:** Edges carry no weight.  
- **Connected Graph:** Every pair of vertices has a path between them.  
- **Cyclic Graph:** Contains at least one cycle.  
- **Acyclic Graph:** Contains no cycles.  

**Common Graph Operations:**
- **Depth-First Search (DFS):** Explores as deep as possible before backtracking.  
- **Breadth-First Search (BFS):** Explores level by level.  
- **Dijkstra’s Algorithm:** Shortest paths from one source in a weighted graph.  
- **Floyd–Warshall Algorithm:** All-pairs shortest paths.  

**Key Differences Between Binary Trees and Graphs:**
- A binary tree is a directed acyclic graph with at most two children per node.  
- Graphs impose no limit on node connections and may contain cycles.  

**Applications:**
- **Binary Trees:** Databases, search algorithms, expression parsing.  
- **Graphs:** Networking, route finding (GPS), social networks, complex relationship modeling.  

### Example of a Graph in TypeScript
```typescript
class Graph {
    adjacencyList: Map<string, string[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    addVertex(vertex: string) {
        if (!this.adjacencyList.has(vertex)) {
            this.adjacencyList.set(vertex, []);
        }
    }

    addEdge(v1: string, v2: string) {
        if (this.adjacencyList.has(v1)) this.adjacencyList.get(v1)!.push(v2);
        if (this.adjacencyList.has(v2)) this.adjacencyList.get(v2)!.push(v1);
    }

    bfs(start: string) {
        const visited = new Set<string>();
        const queue = [start];
        visited.add(start);
        while (queue.length) {
            const v = queue.shift()!;
            console.log(v);
            for (const n of this.adjacencyList.get(v) || []) {
                if (!visited.has(n)) {
                    visited.add(n);
                    queue.push(n);
                }
            }
        }
    }

    dfs(start: string) {
        const visited = new Set<string>();
        const recurse = (v: string) => {
            visited.add(v);
            console.log(v);
            for (const n of this.adjacencyList.get(v) || []) {
                if (!visited.has(n)) recurse(n);
            }
        };
        recurse(start);
    }
}

// Usage example...
```

## Union‑Find (Disjoint Set Union, DSU)
An efficient structure for disjoint sets, supporting:
- **Find(x):** Returns representative of x’s set.  
- **Union(x,y):** Merges sets containing x and y.  

**Optimizations:**
- **Path Compression:** Flattens trees during find.  
- **Union by Rank:** Attaches smaller tree under larger.  

**Complexity:** Nearly O(1) per operation (amortized α(n)).  

**Practical Uses:**
- Network connectivity checks  
- Image segmentation  
- Kruskal’s MST algorithm  
- Social network group tracking  
- Dynamic connectivity in games  
- Clustering algorithms  
