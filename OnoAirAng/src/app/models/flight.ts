import { Destination } from './destination';

export class Flight {
  constructor(
    public flightNumber: string, // Flight number (e.g., "FL001")
    public departure: Destination, // Departure destination object
    public arrival: Destination, // Arrival destination object
    public departureDateTime: Date, // Departure date and time
    public arrivalDateTime: Date, // Arrival date and time
    public seats: number // Number of seats available
  ) {}
}

import { destinations } from './destination';

export const flights: Flight[] = [
  ...Array.from({ length: 30 }, (_, i) => {
    const departureDate = new Date(2025, 0, 1 + i * 2); // Generate flights every 2 days starting from January 1st
    const arrivalDate = new Date(departureDate);
    arrivalDate.setHours(departureDate.getHours() + 5); // Assume each flight is 5 hours long

    return new Flight(
      `FL${(i + 20).toString().padStart(3, '0')}`, // Generate flight numbers FL020, FL021, etc.
      destinations.find(d => d.code === 'JFK')!, // Set departure as JFK
      destinations.find(d => d.code === 'LAX')!, // Set arrival as LAX
      departureDate,
      arrivalDate,
      Math.floor(Math.random() * 100) + 100 // Randomize seats between 100 and 200
    );
  }),
];