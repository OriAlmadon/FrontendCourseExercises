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

  // Find alternative flights (same route, within ±2 days)
  findAlternatives(origin: string, destination: string, date: Date): Flight[] {
    const targetDate = new Date(date);
    return this.getFlights().filter(flight => {
      const flightDate = new Date(flight.departureDateTime);
      const isCloseDate = Math.abs(flightDate.getTime() - targetDate.getTime()) <= 2 * 24 * 60 * 60 * 1000; // ±2 days
      return flight.departure.code === origin && flight.arrival.code === destination && isCloseDate;
    });
  }

  // Reset to original data
  resetFlights(): void {
    this.flightListSubject.next([...this.originalFlights]);
  }
}
