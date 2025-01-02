import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';
import { DatePipe } from '@angular/common'; // Import DatePipe
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../shared/header/header.component';
import { BookingService } from '../../services/booking.service';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [HeaderComponent, NgIf, NgFor, FormsModule, DatePipe], // Include DatePipe here
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  flight: Flight | undefined;
  passengers: { name: string; passportNumber: string }[] = [];
  newBooking: Booking | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private flightService: FlightService,
    private bookingService: BookingService
  ) {}

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

  bookFlight(): void {
    if (this.flight && this.passengers.length > 0) {
      this.newBooking = this.bookingService.createBooking(this.flight, this.passengers);
      console.log('Booking Successful:', this.newBooking);
      alert('Booking successful!');
      this.router.navigate(['/user/bookings']);
    } else {
      alert('Please add passengers before booking.');
    }
  }
}
