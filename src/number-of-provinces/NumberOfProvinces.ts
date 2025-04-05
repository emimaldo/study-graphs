export class NumberOfProvinces
{
    getNumberOfProvinces(isConnected: number[][]): number {
        const visited: boolean[] = new Array(isConnected.length).fill(false);

        const dfs = (node: number) => {
            visited[node] = true;
            for (let neighbor = 0; neighbor < isConnected[node].length; neighbor++) {
            if (isConnected[node][neighbor] === 1 && !visited[neighbor]) {
                dfs(neighbor);
            }
            }
        };

        let provinces = 0;
        for (let i = 0; i < isConnected.length; i++) {
            if (!visited[i]) {
            provinces++;
            dfs(i);
            }
        }

        return provinces;
    }
}