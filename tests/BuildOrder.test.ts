import { BuildOrder } from "../src/build-order/BuildOrder.ts";

describe('BuildOrder', () => {
    let buildOrder: BuildOrder;
    
    beforeEach(() => {
        buildOrder = new BuildOrder();
    });

    it('should return a valid build order for a simple case', () => {
        const dependencies = [
            ['a', 'b'],
            ['b', 'c'],
            ['a', 'c'],
        ];
        const result = buildOrder.findBuildOrder(dependencies);
        expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should return a valid build order for a complex case', () => {
        const dependencies = [
            ['a', 'd'],
            ['f', 'b'],
            ['b', 'd'],
            ['f', 'a'],
            ['d', 'c'],
        ];
        const result = buildOrder.findBuildOrder(dependencies);

        // Verify that the result contains all the nodes
        expect(result).toEqual(expect.arrayContaining(['f', 'a', 'b', 'd', 'c']));

        // Verify that the order respects the dependencies
        const dependencyMap = new Map<string, string[]>();
        for (const [before, after] of dependencies) {
            if (!dependencyMap.has(after)) {
                dependencyMap.set(after, []);
            }
            dependencyMap.get(after)!.push(before);
        }

        if (result === null) {
            throw new Error("Result is null");
        }
        for (let i = 0; i < result.length; i++) {
            const current = result[i];
            const dependencies = dependencyMap.get(current) || [];
            for (const dependency of dependencies) {
                expect(result.indexOf(dependency)).toBeLessThan(i);
            }
        }
    });

    it('should return null for a case with circular dependencies', () => {
        const dependencies = [
            ['a', 'b'],
            ['b', 'c'],
            ['c', 'a'],
        ];
        const result = buildOrder.findBuildOrder(dependencies);
        expect(result).toBeNull();
    });

    it('should return a valid build order for a case with multiple valid orders', () => {
        const dependencies = [
            ['a', 'b'],
            ['a', 'c'],
            ['b', 'd'],
            ['c', 'd'],
        ];
        const result = buildOrder.findBuildOrder(dependencies);
        expect(result).toEqual(expect.arrayContaining(['a', 'b', 'c', 'd']));
    });

    it('should return a valid build order for a case with no dependencies', () => {
        const dependencies: string[][] = [];
        const result = buildOrder.findBuildOrder(dependencies);
        expect(result).toEqual([]);
    });
});
// This test suite covers the main functionalities of the BuildOrder class, including:
// - Finding a valid build order for simple and complex cases
// - Handling circular dependencies
// - Handling multiple valid orders
// - Handling cases with no dependencies