# Redundant Connection – Union-Find Explanation

## Problem Overview

This module provides a solution to detect a redundant edge in an undirected graph using the Union-Find (Disjoint Set Union) algorithm with path compression and union by rank optimizations.

## How It Works

When trying to add an edge between two nodes that are already connected, that edge is redundant (forms a cycle).

### Example

Given the edges: `[[1,2], [2,3], [3,4], [1,4], [4,5]]`

- The redundant edge is `[1,4]` (forms a cycle 1-2-3-4-1).

#### Step-by-step:

1. **Initialization:**
   - `parent = [0,1,2,3,4,5]` (each node is its own parent)
   - `rank   = [0,0,0,0,0,0]` (all trees have height 0)

2. **Processing edges:**
   - `[1,2]`: join sets → `parent = [0,1,1,3,4,5]`, `rank = [0,1,0,0,0,0]`
   - `[2,3]`: join sets → `parent = [0,1,1,1,4,5]`, `rank = [0,1,0,0,0,0]`
   - `[3,4]`: join sets → `parent = [0,1,1,1,1,5]`, `rank = [0,1,0,0,0,0]`
   - `[1,4]`: both nodes already have the same root → cycle detected

## Union-Find Concepts

### Path Compression

- Flattens the tree structure during `find` operations.
- Example: If `parent = [0,1,1,2,3,4]` and you call `find(4)`, after the operation, nodes 2, 3, and 4 will all point directly to 1.

### Union by Rank

- Keeps the trees shallow by always attaching the shorter tree to the root of the taller tree.
- If ranks are equal, one root becomes the parent and its rank increases by one.

#### Example

Suppose two trees:
- Tree 1: root=1, nodes=[1,2,4], rank=1
- Tree 2: root=3, nodes=[3,5,6,7], rank=2

When joining with `union(2,5)`:
- `find(2) = 1`, `find(5) = 3`
- Since `rank[3] > rank[1]`, set `parent[1] = 3`

## Real-life Applications

- **Network connectivity**: Checking if two computers are in the same network.
- **Image processing**: Grouping pixels into connected regions.
- **Kruskal’s algorithm**: Building minimum spanning trees.
- **Social networks**: Tracking friend groups or communities.
- **Games**: Tracking connected areas in dynamic maps.
- **Clustering**: Grouping similar items in data analysis.

---

For more details, see the code in `RedundantConnection.ts`.