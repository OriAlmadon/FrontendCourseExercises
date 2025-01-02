import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

import { HeaderComponent } from '../../shared/header/header.component';
import { FlightService } from '../../services/flight.service';
import { Flight } from '../../models/flight';

@Component({
  selector: 'app-all-flights',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, HeaderComponent],
  templateUrl: './all-flights.component.html',
  styleUrls: ['./all-flights.component.css'],
  providers: [FlightService],
})
export class AllFlightsComponent implements OnInit {
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
    this.flights = this.flightService.getAll();
  }

  bookFlight(flightNumber: string): void {
    this.router.navigate(['/booking', flightNumber]);
  }
}
