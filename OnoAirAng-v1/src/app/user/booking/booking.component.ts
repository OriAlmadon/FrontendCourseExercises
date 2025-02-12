import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';
import { Booking } from '../../models/booking';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [NgIf, NgFor, FormsModule, DatePipe],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
  providers: [DatePipe]
})
export class BookingComponent implements OnInit {
  flight: Flight | undefined;
  passengers: { name: string; passportNumber: string }[] = [];
  newBooking: Booking | null = null;
  errorMessage: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private bookingService: BookingService,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    const flightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (flightNumber) {
      this.flight = this.flightService.getByFlightNumber(flightNumber);
    }

    if (!this.flight) {
      console.error('Flight not found');
      this.router.navigate(['/last-minute-flights']);
    }
  }

  addPassenger(): void {
    this.passengers.push({ name: '', passportNumber: '' });
  }

  bookFlight(form: NgForm): void {
    if (!form.valid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    // Ensure the flight object is defined before proceeding
    if (!this.flight) {
      this.errorMessage = 'Flight not found or unavailable.';
      return;
    }

    // Check for duplicate passengers within the new booking
    const hasNewBookingDuplicates = this.passengers.some((passenger, index, self) =>
      index !== self.findIndex((p) => p.passportNumber === passenger.passportNumber)
    );

    if (hasNewBookingDuplicates) {
      this.errorMessage = 'Duplicate passenger found in the new booking. Please ensure all passengers have unique passport numbers.';
      return;
    }

    // Check for duplicate passengers in existing bookings
    const existingBookings = this.bookingService.getAll(); // Get all bookings from the service
    const existingPassengers = existingBookings.flatMap(booking => booking.passengers); // Extract passengers from all bookings

    const hasDuplicateInExistingBookings = this.passengers.some((newPassenger) =>
      existingPassengers.some(existingPassenger => existingPassenger.passportNumber === newPassenger.passportNumber)
    );

    if (hasDuplicateInExistingBookings) {
      this.errorMessage = 'Duplicate passenger found across existing bookings. Please ensure all passengers have unique passport numbers.';
      return;
    }

    // Calculate the total number of passengers across all bookings
    const totalExistingPassengers = existingBookings.reduce((total, booking) => total + booking.passengers.length, 0);

    // Ensure the total passenger count (existing + new) does not exceed available seats
    const totalPassengers = totalExistingPassengers + this.passengers.length;
    if (totalPassengers > this.flight.seats) {
      this.errorMessage = `The total number of passengers exceeds the available seats for this flight. Available seats: ${this.flight.seats}, Total passengers: ${totalPassengers}`;
      return;
    }

    // Proceed with booking if no issues
    if (this.flight && this.passengers.length > 0) {
      this.newBooking = this.bookingService.createBooking(this.flight, this.passengers);
      console.log('Booking Successful:', this.newBooking);
      this.notificationService.showSuccess('Booking successful!');
      this.router.navigate(['/user/bookings']);
    } else {
      this.errorMessage = 'Please add passengers before booking.';
    }
  }
}
