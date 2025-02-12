import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';

import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatButtonModule,
    MatMenuModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FlightService],
})
export class HomeComponent implements OnInit, AfterViewInit {
  lastMinuteFlights: Flight[] = [];
  displayedColumns: string[] = ['flightNumber', 'departure', 'arrival', 'departureTime', 'arrivalTime', 'seats', 'actions'];
  dataSource = new MatTableDataSource<Flight>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private router: Router, private flightService: FlightService) { }

  ngOnInit(): void {
    this.loadFlights();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  loadFlights(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7); // End of the week
    endOfWeek.setHours(23, 59, 59, 999); // End of the last day of the week

    const allFlights = this.flightService
      .getAll();
    this.lastMinuteFlights = allFlights
      .filter(
        (flight: Flight) =>
          flight.departureDateTime >= today &&
          flight.departureDateTime <= endOfWeek
      )
      .slice(0, 3);

    // All Flights
    this.dataSource.data = allFlights;
  }

  bookFlight(flightNumber: string): void {
    this.router.navigate(['/booking', flightNumber]);
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
