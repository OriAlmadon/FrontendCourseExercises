import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/booking';
import { Flight } from '../models/flight';
import { Coupon } from '../models/coupon';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private bookings: Booking[] = []; // Store the current bookings
  private bookingsSubject = new BehaviorSubject<Booking[]>([...this.bookings]);
  bookings$ = this.bookingsSubject.asObservable(); // Observable for global access

  // Get all bookings
  getAll(): Booking[] {
    return this.bookingsSubject.getValue();
  }

  // Get a booking by its ID
  getById(id: number): Booking | undefined {
    return this.getAll().find(booking => booking.id === id);
  }

  // Get a booking by the flight number
  getByFlightNumber(flightNumber: string): Booking | undefined {
    return this.getAll().find(booking => booking.flight.flightNumber === flightNumber);
  }

  // Create a new booking with optional coupon and update the observable list
  createBooking(
    flight: Flight,
    passengers: { name: string; passportNumber: string }[],
    basePrice: number,
    coupon?: Coupon
  ): Booking {
    const newBooking: Booking = {
      id: this.generateUniqueId(),
      flight,
      passengers,
      basePrice,
      coupon, // Coupon is optional
    };

    this.bookings.push(newBooking); // Add to internal array
    this.bookingsSubject.next([...this.bookings]); // Update the BehaviorSubject with the new list
    return newBooking;
  }

  // Remove a booking by its ID and update the observable list
  removeBooking(id: number): void {
    this.bookings = this.bookings.filter(booking => booking.id !== id); // Filter out the booking by ID
    this.bookingsSubject.next([...this.bookings]); // Update the BehaviorSubject with the new list
  }

  // Update a booking and emit the updated list
  updateBooking(updatedBooking: Booking): Booking | undefined {
    const index = this.bookings.findIndex(booking => booking.id === updatedBooking.id);
    
    if (index !== -1) {
      this.bookings[index] = updatedBooking; // Update booking
      this.bookingsSubject.next([...this.bookings]); // Emit updated bookings list
      return updatedBooking;
    }
    return undefined;
  }

  // Generate a unique ID for each booking
  private generateUniqueId(): number {
    return this.bookings.length > 0 ? Math.max(...this.bookings.map(b => b.id)) + 1 : 1;
  }
}
