import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/header/header.component'; // Import the shared header
import { BookingService } from '../../services/booking.service'; // Import BookingService
import { Booking } from '../../models/booking'; // Import the Booking model

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, HeaderComponent], // Include the CommonModule and HeaderComponent
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  bookings: Booking[] = []; // Array to store all bookings

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.bookings = this.bookingService.getAll(); // Fetch all bookings from BookingService
  }
}
