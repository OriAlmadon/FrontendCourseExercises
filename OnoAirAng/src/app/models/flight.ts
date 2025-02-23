import { Destination, destinations } from './destination';

export class Flight {
  constructor(
    public flightNumber: string, // Flight number (e.g., "FL001")
    public departure: Destination, // Departure destination object
    public arrival: Destination, // Arrival destination object
    public departureDateTime: Date, // Departure date and time
    public arrivalDateTime: Date, // Arrival date and time
    public seats: number, // Number of seats available
    public price: number, // Ticket price
    public status: "On Time" | "Delayed" | "Cancelled" = "On Time", // Default: "On Time"
    public updatedDepartureTime: Date = departureDateTime, // Initially same as scheduled departure
    public updatedArrivalTime: Date = arrivalDateTime, // Initially same as scheduled arrival
    public statusLastUpdated: Date = new Date() // Default to now
  ) {}
}

export const flights: Flight[] = Array.from({ length: 30 }, (_, i) => {
  const departureDate = new Date(2025, 0, 1 + i * 2);
  const arrivalDate = new Date(departureDate);
  arrivalDate.setHours(departureDate.getHours() + 5);

  return new Flight(
    `FL${(i + 30).toString().padStart(3, '0')}`, 
    destinations.find(d => d.code === 'JFK')!, 
    destinations.find(d => d.code === 'LAX')!, 
    departureDate,
    arrivalDate,
    Math.floor(Math.random() * 100) + 100, // Random seat count between 100 and 199
    Math.floor(Math.random() * 300) + 200 // Random price between 200 and 499
  );
});
