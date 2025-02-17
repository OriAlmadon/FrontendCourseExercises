import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Flight, flights } from '../models/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private originalFlights = flights; // Store the original flight data
  private flightListSubject = new BehaviorSubject<Flight[]>([...this.originalFlights]); // BehaviorSubject for dynamic updates
  flightList$ = this.flightListSubject.asObservable(); // Observable for global use

  // Get all flights (as array)
  getFlights(): Flight[] {
    return this.flightListSubject.getValue();
  }

  // Get flight by flight number
  getByFlightNumber(flightNumber: string): Flight | undefined {
    return this.getFlights().find(flight => flight.flightNumber === flightNumber);
  }

  // Update flight status (and departure/arrival time if delayed)
  updateFlightStatus(flightNumber: string, status: 'On Time' | 'Delayed' | 'Cancelled', updatedDepartureTime?: Date, updatedArrivalTime?: Date): void {
    const flights = this.getFlights().map(flight => {
      if (flight.flightNumber === flightNumber) {
        return {
          ...flight,
          status,
          updatedDepartureTime: status === 'Delayed' ? updatedDepartureTime || flight.departureDateTime : flight.departureDateTime,
          updatedArrivalTime: status === 'Delayed' ? updatedArrivalTime || flight.arrivalDateTime : flight.arrivalDateTime,
          statusLastUpdated: new Date(),
        };
      }
      return flight;
    });

    this.flightListSubject.next(flights); // Emit updated flights list
  }

  // Reset to original data on page refresh
  resetFlights(): void {
    this.flightListSubject.next([...this.originalFlights]); // Reset to original flights
  }
}
