import { NumberOfProvinces } from '../src/number-of-provinces/NumberOfProvinces.ts';

describe('NumberOfProvinces', () => {
    let instance: NumberOfProvinces;

    beforeEach(() => {
        instance = new NumberOfProvinces();
    });

    it('should return 2 provinces for a 3x3 matrix with two connected components', () => {
        const isConnected = [
            [1, 1, 0],
            [1, 1, 0],
            [0, 0, 1],
        ];
        const result = instance.getNumberOfProvinces(isConnected);
        expect(result).toBe(2);
    });

    it('should return 1 province for a fully connected 3x3 matrix', () => {
        const isConnected = [
            [1, 1, 1],
            [1, 1, 1],
            [1, 1, 1],
        ];
        const result = instance.getNumberOfProvinces(isConnected);
        expect(result).toBe(1);
    });

    it('should return 3 provinces for a 3x3 matrix with no connections', () => {
        const isConnected = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ];
        const result = instance.getNumberOfProvinces(isConnected);
        expect(result).toBe(3);
    });

    it('should handle an empty matrix', () => {
        const isConnected: number[][] = [];
        const result = instance.getNumberOfProvinces(isConnected);
        expect(result).toBe(0);
    });

    it('should handle a 1x1 matrix', () => {
        const isConnected = [[1]];
        const result = instance.getNumberOfProvinces(isConnected);
        expect(result).toBe(1);
    });
});
