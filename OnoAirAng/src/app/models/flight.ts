import { Destination, destinations } from './destination';

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

export const flights: Flight[] = [
  ...Array.from({ length: 30 }, (_, i) => {
    const departureDate = new Date(2025, 0, 1 + i * 2);
    const arrivalDate = new Date(departureDate);
    arrivalDate.setHours(departureDate.getHours() + 5);

    return new Flight(
      `FL${(i + 30).toString().padStart(3, '0')}`, 
      destinations.find(d => d.code === 'JFK')!, 
      destinations.find(d => d.code === 'LAX')!, 
      departureDate,
      arrivalDate,
      Math.floor(Math.random() * 100) + 100 
    );
  }),
];
