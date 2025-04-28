import { RedundantConnection } from "../src/redundant-connection/RedundantConnection.ts";

describe('RedundantConnection', () => {
    let instance: RedundantConnection;
    
    beforeEach(() => {
        instance = new RedundantConnection();
    });

    it('should find the redundant connection in a simple case', () => {
        const edges = [[1, 2], [1, 3], [2, 3]];
        const result = instance.findRedundantConnection(edges);
        expect(result).toEqual([2, 3]);
    });

    it('should find the redundant connection in a more complex case', () => {
        const edges = [[1, 2], [2, 3], [3, 4], [1, 4], [4, 5]];
        const result = instance.findRedundantConnection(edges);
        expect(result).toEqual([1, 4]);
    });

    it('should return null for a graph with no redundant connections', () => {
        const edges = [[1, 2], [2, 3], [3, 4]];
        const result = instance.findRedundantConnection(edges);
        expect(result).toBeNull();
    });

    it('should handle a single edge', () => {
        const edges = [[1, 2]];
        const result = instance.findRedundantConnection(edges);
        expect(result).toBeNull();
    });

    it('should handle multiple edges forming a cycle', () => {
        const edges = [[1, 2], [2, 3], [3, 1]];
        const result = instance.findRedundantConnection(edges);
        expect(result).toEqual([3, 1]);
    });
});