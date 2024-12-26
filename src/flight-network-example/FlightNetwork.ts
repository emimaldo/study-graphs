export class FlightNetwork {
    private adjacencyList: Map<string, string[]>;

    constructor() {
        this.adjacencyList = new Map();
    }

    // Add a city
    addCity(city: string) {
        if (!this.adjacencyList.has(city)) {
            this.adjacencyList.set(city, []);
        }
    }

    // Add a flight between two cities
    addFlight(city1: string, city2: string) {
        if (this.adjacencyList.has(city1) && this.adjacencyList.has(city2)) {
            this.adjacencyList.get(city1)?.push(city2);
            this.adjacencyList.get(city2)?.push(city1);

        }
    }

    // Display the flight network
    displayFlightNetwork() {
        for (let [city, destinations] of this.adjacencyList) {
            console.log(`${city} -> ${destinations.join(', ')}`);
        }
    }


    // Figure out if exists a route between two cities using BFS
    findRoute(startCity: string, destinationCity: string): boolean {
        const visited = new Set<string>();

        const queue: string[] = [startCity];

        visited.add(startCity);

        while(queue.length > 0) {
            const city = queue.shift()!;

            if (city === destinationCity) {
                return true; 
            }

            const destinations = this.adjacencyList.get(city);

            if (destinations) {
                for (const destination of destinations) {
                    if (!visited.has(destination)) {
                        visited.add(destination);
                        queue.push(destination);
                    }
                }
            }
        }

        return false;
    }
}