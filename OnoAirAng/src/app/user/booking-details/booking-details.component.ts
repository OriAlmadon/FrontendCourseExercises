import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-booking-details',
  standalone: true,
  imports: [CommonModule, MatButtonModule, DatePipe, MatCardModule, MatIconModule],
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.css'],
})
export class BookingDetailsComponent implements OnInit {
  booking: Booking | null = null;
  duration: string = ''; // Store calculated duration

  constructor(private route: ActivatedRoute, private router: Router, private bookingService: BookingService) {}

  ngOnInit(): void {
    const bookingFlightNumber = this.route.snapshot.paramMap.get('flightNumber');
    if (bookingFlightNumber) {
      this.booking = this.bookingService.getByFlightNumber(bookingFlightNumber) || null; // ✅ Fix: Handle undefined
      
      if (this.booking) {
        this.duration = this.getDuration(
          this.booking.flight.departureDateTime,
          this.booking.flight.arrivalDateTime
        );
      }
    }
  }

  // ✅ Calculate duration dynamically
  getDuration(departureDateTime: Date, arrivalDateTime: Date): string {
    if (!departureDateTime || !arrivalDateTime) return 'N/A';

    const diffMs = new Date(arrivalDateTime).getTime() - new Date(departureDateTime).getTime();
    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    return `${hours}h ${minutes}m`;
  }

  statusClass(status: string): string {
    return {
      'On Time': 'status-on-time',
      'Delayed': 'status-delayed',
      'Cancelled': 'status-cancelled'
    }[status] || '';
  } 

  goBack(): void {
    this.router.navigate(['/user/bookings']);
  }
}
