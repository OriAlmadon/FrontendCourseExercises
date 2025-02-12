import { Injectable } from '@angular/core';
import { Booking } from '../models/booking';
import { Flight } from '../models/flight';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = [];

  getAll(): Booking[] {
    return this.bookings;
  }

  getById(id: number): Booking | undefined {
    return this.bookings.find(booking => booking.id === id);
  }

  getByFlightNumber(flightNumber: string): Booking | undefined {
    return this.bookings.find(booking => booking.flight.flightNumber === flightNumber);
  }

  createBooking(flight: Flight, passengers: { name: string; passportNumber: string }[]): Booking {
    const newBooking: Booking = {
      id: this.bookings.length + 1,
      flight,
      passengers,
    };

    this.bookings.push(newBooking);
    return newBooking;
  }
}
