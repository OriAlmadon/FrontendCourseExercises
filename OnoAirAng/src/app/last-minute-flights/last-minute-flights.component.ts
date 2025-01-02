import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../shared/header/header.component';
import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight';

@Component({
  selector: 'app-last-minute-flights',
  standalone: true,
  imports: [CommonModule, MatTableModule, HeaderComponent],
  templateUrl: './last-minute-flights.component.html',
  styleUrls: ['./last-minute-flights.component.css'],
  providers: [FlightService],
})
export class LastMinuteFlightsComponent implements OnInit {
  flights: Flight[] = [];
  displayedColumns: string[] = [
    'flightNumber',
    'departure',
    'arrival',
    'departureTime',
    'arrivalTime',
    'seats',
    'actions',
  ];

  constructor(private flightService: FlightService, private router: Router) {}

  ngOnInit(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7); // End of the current week
    endOfWeek.setHours(23, 59, 59, 999); // End of the last day of the week

    this.flights = this.flightService
      .getAll()
      .filter(
        (flight: Flight) =>
          flight.departureDateTime >= today &&
          flight.departureDateTime <= endOfWeek
      )
      .sort(
        (a: Flight, b: Flight) =>
          a.departureDateTime.getTime() - b.departureDateTime.getTime()
      );
  }

  // Define the bookFlight method
  bookFlight(flightNumber: string): void {
    console.log(`Booking flight: ${flightNumber}`);
    // Add your booking logic here
  }
}
