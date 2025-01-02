import { Injectable } from '@angular/core';
import { Flight, flights } from '../models/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  getAll(): Flight[] {
    console.log('Fetching all flights:', flights);
    return flights;
  }

  getByFlightNumber(flightNumber: string): Flight | undefined {
    const flight = flights.find(f => f.flightNumber === flightNumber);
    if (flight) {
      console.log(`Flight Found for ${flightNumber}:`, flight);
    } else {
      console.error(`No flight found for flight number: ${flightNumber}`);
    }
    return flight;
  }
}
