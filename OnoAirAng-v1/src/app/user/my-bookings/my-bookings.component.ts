import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking';
import { RouterModule } from '@angular/router';

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

  displayedColumns: string[] = ['flightNumber', 'departure', 'arrival', 'departureTime', 'passengers'];

  futureBookingsDataSource = new MatTableDataSource<Booking>([]);
  pastBookingsDataSource = new MatTableDataSource<Booking>([]);

  @ViewChild('futurePaginator') futurePaginator!: MatPaginator;
  @ViewChild('futureSort') futureSort!: MatSort;
  @ViewChild('pastPaginator') pastPaginator!: MatPaginator;
  @ViewChild('pastSort') pastSort!: MatSort;

  constructor(private bookingService: BookingService) { }

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
    this.bookings = this.bookingService.getAll(); // Fetch bookings

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

}
