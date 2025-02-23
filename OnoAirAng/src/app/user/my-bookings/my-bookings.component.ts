import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking';
import { Router, RouterModule } from '@angular/router';
import { Flight } from '../../models/flight';
import { FlightService } from '../../services/flight.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatSortModule, RouterModule],
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit, AfterViewInit {
  bookings: Booking[] = [];
  futureBookings: Booking[] = [];
  pastBookings: Booking[] = [];
  alternativeFlights: Flight[] = [];
  selectedCancelledFlight: Booking | null = null;

  displayedColumns: string[] = ['flightNumber', 'departure', 'arrival', 'departureTime', 'basePrice', 'coupon', 'passengers', 'status'];

  futureBookingsDataSource = new MatTableDataSource<Booking>([]);
  pastBookingsDataSource = new MatTableDataSource<Booking>([]);
  alternativeFlightsDataSource = new MatTableDataSource<Flight>([]);

  @ViewChild('futurePaginator') futurePaginator!: MatPaginator;
  @ViewChild('futureSort') futureSort!: MatSort;
  @ViewChild('pastPaginator') pastPaginator!: MatPaginator;
  @ViewChild('pastSort') pastSort!: MatSort;

  constructor(private router: Router, private bookingService: BookingService, private flightService: FlightService) { }

  ngOnInit(): void {
    this.loadBookings();
  }

  ngAfterViewInit(): void {
    this.futureBookingsDataSource.paginator = this.futurePaginator;
    this.futureBookingsDataSource.sort = this.futureSort;
    this.pastBookingsDataSource.paginator = this.pastPaginator;
    this.pastBookingsDataSource.sort = this.pastSort;
  }

  loadBookings(): void {
    this.bookings = this.bookingService.getAll();

    const now = new Date();

    // Separate past and future bookings
    this.futureBookings = this.bookings.filter(booking => new Date(booking.flight.departureDateTime) >= now);
    this.pastBookings = this.bookings.filter(booking => new Date(booking.flight.departureDateTime) < now);

    // Sort future bookings in ascending order by departure date
    this.futureBookings.sort((a, b) => new Date(a.flight.departureDateTime).getTime() - new Date(b.flight.departureDateTime).getTime());

    // Sort past bookings in descending order by departure date
    this.pastBookings.sort((a, b) => new Date(b.flight.departureDateTime).getTime() - new Date(a.flight.departureDateTime).getTime());

    // Assign to data sources for table
    this.futureBookingsDataSource.data = this.futureBookings;
    this.pastBookingsDataSource.data = this.pastBookings;
  }

  // Find alternative flights
  showAlternatives(booking: Booking): void {
    this.selectedCancelledFlight = booking;

    this.alternativeFlights = this.flightService.findAlternatives(
      booking.flight.departure.code,
      booking.flight.arrival.code,
      booking.flight.departureDateTime
    ).filter(flight => flight.flightNumber !== booking.flight.flightNumber);

    this.alternativeFlightsDataSource.data = this.alternativeFlights;
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'On Time':
        return 'status-on-time';
      case 'Delayed':
        return 'status-delayed';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  }

  bookAlternative(flightNumber: string): void {
    this.router.navigate(['/booking', flightNumber]);
  }
}
