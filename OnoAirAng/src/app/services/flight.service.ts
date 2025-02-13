import { Injectable } from '@angular/core';
import { Flight, flights } from '../models/flight';

@Injectable({
  providedIn: 'root',
})
export class FlightService {
  private flightList = flights;

  getAll(): Flight[] {
    console.log(this.flightList);
    return this.flightList;
  }

  getByFlightNumber(flightNumber: string): Flight | undefined {
    return this.flightList.find(flight => flight.flightNumber === flightNumber);
  }
}
