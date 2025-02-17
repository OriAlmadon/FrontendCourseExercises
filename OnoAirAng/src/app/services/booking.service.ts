import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Booking } from '../models/booking';
import { Flight } from '../models/flight';

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

  // Create a new booking and update the observable list
  createBooking(flight: Flight, passengers: { name: string; passportNumber: string }[]): Booking {
    const newBooking: Booking = {
      id: this.bookings.length + 1, // Generate a unique ID based on current length
      flight,
      passengers,
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

  // Update a booking (e.g., add or modify passengers) and emit the updated list
  updateBooking(updatedBooking: Booking): Booking | undefined {
    const index = this.bookings.findIndex(booking => booking.id === updatedBooking.id);
    
    if (index !== -1) {
      this.bookings[index] = updatedBooking; // Update booking
      this.bookingsSubject.next([...this.bookings]); // Emit updated bookings list
      return updatedBooking;
    }
    return undefined;
  }
}
