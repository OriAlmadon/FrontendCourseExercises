import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

import { FlightService } from '../services/flight.service';
import { Flight } from '../models/flight';
import { HeaderComponent } from "../shared/header/header.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, MatTableModule, CommonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [FlightService],
})
export class HomeComponent implements OnInit {
  lastMinuteFlights: Flight[] = [];

  constructor(private router: Router, private flightService: FlightService) {}

  ngOnInit(): void {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + 7); // End of the week
    endOfWeek.setHours(23, 59, 59, 999); // End of the last day of the week

    this.lastMinuteFlights = this.flightService
      .getAll()
      .filter(
        (flight: Flight) =>
          flight.departureDateTime >= today &&
          flight.departureDateTime <= endOfWeek
      )
      .slice(0, 3); // Limit the display to 3 flights
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
