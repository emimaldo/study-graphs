import { FlightNetwork } from "./flight-network-example/FlightNetwork.ts";

const flightNetwork = new FlightNetwork();

// Add cities
flightNetwork.addCity('New York');
flightNetwork.addCity('London');
flightNetwork.addCity('Paris');
flightNetwork.addCity('Tokyo');
flightNetwork.addCity('Sydney');

// Add flights between cities
flightNetwork.addFlight('New York', 'London');
flightNetwork.addFlight('London', 'Paris');
flightNetwork.addFlight('Paris', 'Tokyo');
flightNetwork.addFlight('Tokyo', 'Sydney');

// Display the flights network
flightNetwork.displayFlightNetwork();

// Find routes between cities
console.log("Is there a route between New York and Tokyo?");
console.log(flightNetwork.findRoute('New York', 'Tokyo'));  // true

console.log("Is there a route between New York and Sidney?");
console.log(flightNetwork.findRoute('New York', 'Sydney'));  // true

console.log("Is there a route between Sidney and London?");
console.log(flightNetwork.findRoute('Sydney', 'London'));  // true

console.log("Is there a route between New York and Berlin?");
console.log(flightNetwork.findRoute('New York', 'Berlin'));  // false