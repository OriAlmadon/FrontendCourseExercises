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

  createBooking(flight: Flight, passengers: { name: string; passportNumber: string }[]): Booking {
    const newBooking: Booking = {
      id: this.bookings.length + 1, // Generate a new ID
      flight, // Assign the flight details
      passengers, // Assign the passengers array
    };

    this.bookings.push(newBooking); // Add the new booking to the list
    return newBooking; // Return the new booking
  }
}
